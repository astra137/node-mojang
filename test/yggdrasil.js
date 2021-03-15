const {createReadStream} = require('fs');
const {finished} = require('stream');

const test = require('ava');
const got = require('got');
const parse = require('jose/jwk/parse');

const mojang = require('../dist');

const {
	MOJANG_USERNAME,
	MOJANG_PASSWORD,
	MOJANG_CLIENTTOKEN,
	MOJANG_ANSWER1,
	MOJANG_ANSWER2,
	MOJANG_ANSWER3,
	MOJANG_PROFILE_ID,
	MOJANG_SKIN_FILE
} = process.env;

async function delay(ms) {
	await new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

test.beforeEach(async () => {
	await delay(1000);
});

/*

Yggdrasil authentication service.

*/

test.serial('authenticate with invalid credentials', async t => {
	try {
		await mojang.authenticate('test', 'test', MOJANG_CLIENTTOKEN);
		t.fail();
	} catch (error) {
		// https://github.com/sindresorhus/got#errors
		t.is(error.name, 'HTTPError');
		t.is(error.response.statusCode, 403);
		// https://wiki.vg/Authentication#Errors
		t.is(error.response.body.error, 'ForbiddenOperationException');
		t.is(
			error.response.body.errorMessage,
			'Invalid credentials. Invalid username or password.'
		);
	}
});

test.serial('validate with invalid token', async t => {
	t.false(
		await mojang.validate({
			accessToken: 'not a token',
			clientToken: MOJANG_CLIENTTOKEN
		})
	);
});

test.serial('invalidate with invalid token', async t => {
	await t.notThrowsAsync(
		mojang.invalidate({
			accessToken: 'not a token',
			clientToken: MOJANG_CLIENTTOKEN
		})
	);
});

test.serial('authentication workflow', async t => {
	// Create Minecraft session with user
	const s1 = await mojang.authenticate(
		MOJANG_USERNAME,
		MOJANG_PASSWORD,
		MOJANG_CLIENTTOKEN,
		'Minecraft'
	);

	t.is(s1.clientToken, MOJANG_CLIENTTOKEN);
	t.true('accessToken' in s1);
	t.true('selectedProfile' in s1);
	t.true('user' in s1);
	t.true('sub' in parse(s1.accessToken));

	await delay(1000);

	// Check session is valid
	t.true(await mojang.validate(s1));

	await delay(1000);

	// Refresh and get new session
	const s2 = await mojang.refresh(s1);

	t.true('accessToken' in s2);
	t.true('selectedProfile' in s2);
	t.true('sub' in parse(s2.accessToken));
	t.is(s2.clientToken, s1.clientToken);
	t.not(s2.accessToken, s1.accessToken);

	await delay(1000);

	// Old session is invalid, new session is valid
	t.false(await mojang.validate(s1));
	t.true(await mojang.validate(s2));

	await delay(1000);

	// Invalide newer session
	await t.notThrowsAsync(mojang.invalidate(s2));

	await delay(1000);

	// Check newer session invalidated
	t.false(await mojang.validate(s2));

	await delay(1000);

	// WARNING: Invalidate ALL tokens on account!
	await t.notThrowsAsync(mojang.signout(MOJANG_USERNAME, MOJANG_PASSWORD));
});

/*

Security approval, to enable changing a profile's skin.

*/

test.serial('security workflow', async t => {
	// Log into account
	const {accessToken} = await mojang.authenticate(
		MOJANG_USERNAME,
		MOJANG_PASSWORD,
		MOJANG_CLIENTTOKEN
	);

	await delay(1000);

	// Get list of questions
	const challenges = await mojang.challenges(accessToken);
	t.is(challenges.length, 3);

	// Pair environment's answers with assumed answer IDs
	const answers = [
		{
			id: challenges[0].answer.id,
			answer: MOJANG_ANSWER1
		},
		{
			id: challenges[1].answer.id,
			answer: MOJANG_ANSWER2
		},
		{
			id: challenges[2].answer.id,
			answer: MOJANG_ANSWER3
		}
	];

	await delay(1000);

	// Submit answers
	await t.notThrowsAsync(mojang.answers(accessToken, answers));

	await delay(1000);

	// IP should now be trusted
	t.true(await mojang.isTrusted(accessToken));
});

/*

Skins

*/

test.serial('skin workflow', async t => {
	t.timeout(2 * 60 * 1000);

	// Log into account
	const {accessToken} = await mojang.authenticate(
		MOJANG_USERNAME,
		MOJANG_PASSWORD,
		MOJANG_CLIENTTOKEN
	);

	// Ensure IP is "secure" (from above) and skin uploads will work
	t.true(await mojang.isTrusted(accessToken));

	// Test URL version of skin API
	const skinAlexUrl = 'http://assets.mojang.com/SkinTemplates/alex.png';
	const expectedSkin = await (await got(skinAlexUrl)).body;
	await mojang.setSkin(accessToken, MOJANG_PROFILE_ID, skinAlexUrl, true);

	// Wait for skin to apply
	await delay(1000);

	// Check URL set skin
	const sessionResponse = await mojang.session(MOJANG_PROFILE_ID);
	t.true(sessionResponse.slim);
	const actualSkin = await (await got(sessionResponse.skin)).body;
	t.is(actualSkin, expectedSkin);

	// Wait for session() cooldown
	await delay(60000);

	// Test upload stream version of skin API
	const skinStream = createReadStream(MOJANG_SKIN_FILE);
	await mojang.uploadSkin(accessToken, MOJANG_PROFILE_ID, skinStream, false);

	// Wait for skin to apply
	await delay(1000);

	// Check uploaded skin is same to
	const sessionResponse2 = await mojang.session(MOJANG_PROFILE_ID);
	t.false(sessionResponse2.slim);
	const actualSkin2 = (await got(sessionResponse.skin)).body;
	t.is(await actualSkin2, await finished(skinStream));

	// Invalidate only this access token
	await mojang.invalidate(accessToken);
});
