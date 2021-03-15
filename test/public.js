const test = require('ava');
const mojang = require('mojang');
const session = require('mojang/session');

test.beforeEach(async () => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000);
	});
});

test.serial('status()', async t => {
	const status = await mojang.status();
	t.is(Object.keys(status).length, 8);
	t.regex(status['minecraft.net'], /green|yellow|red/g);
	t.regex(status['session.minecraft.net'], /green|yellow|red/g);
	t.regex(status['account.mojang.com'], /green|yellow|red/g);
	t.regex(status['authserver.mojang.com'], /green|yellow|red/g);
	t.regex(status['sessionserver.mojang.com'], /green|yellow|red/g);
	t.regex(status['api.mojang.com'], /green|yellow|red/g);
	t.regex(status['textures.minecraft.net'], /green|yellow|red/g);
	t.regex(status['mojang.com'], /green|yellow|red/g);
});

test.serial('username', async t => {
	const {id, name} = await mojang.username('Cannabis');
	t.is(id, '7fff9c4fff1349babeb2acc9c2747725');
	t.is(name, 'Cannabis');
});

test.serial('username does not exist', async t => {
	const profile = await mojang.username('ea1eb0554866');
	t.falsy(profile);
});

test.serial('usernames batch', async t => {
	const list = await mojang.usernames([
		// Some Mojang staff
		'dinnerbone',
		'searge',
		'krisjelbring',
		'evilseph'
	]);
	t.deepEqual(list, [
		// List order is alphabetical, maybe
		{id: '61699b2ed3274a019f1e0ea8c3f06bc6', name: 'Dinnerbone'},
		{id: '020242a17b9441799eff511eea1221da', name: 'EvilSeph'},
		{id: '7125ba8b1c864508b92bb5c042ccfe2b', name: 'KrisJelbring'},
		{id: '696a82ce41f44b51aa31b8709b8686f0', name: 'Searge'}
	]);
});

test.serial('usernames batch with unknown name', async t => {
	const list = await mojang.usernames(['dinnerbone', 'ea1eb0554866']);
	// List does not contain a profile for unknown in-game name
	t.deepEqual(list, [
		{id: '61699b2ed3274a019f1e0ea8c3f06bc6', name: 'Dinnerbone'}
	]);
});

test.serial('profile', async t => {
	const id = 'af74a02d19cb445bb07f6866a861f783';
	const profile = await mojang.profile(id);
	t.deepEqual(profile, {id, name: 'md_5'});
});

test.serial('profile does not exist', async t => {
	const id = '7fa9a6a2532040628d6401b881f445f2';
	const profile = await mojang.profile(id);
	t.falsy(profile);
});

test.serial('history', async t => {
	const id = 'ae795aa86327408e92ab25c8a59f3ba1';
	const list = await mojang.history(id);
	t.deepEqual(list, [
		{name: 'redstone_sheep'},
		{name: 'jomo', changedToAt: 1423060971000}
	]);
});

test.serial('history does not exist', async t => {
	const id = '7fa9a6a2532040628d6401b881f445f2';
	const list = await mojang.history(id);
	t.falsy(list);
});

test.serial('statistics', async t => {
	const stats = await mojang.statistics([
		'item_sold_minecraft',
		'prepaid_card_redeemed_minecraft',
		'item_sold_cobalt',
		'item_sold_scrolls'
	]);
	t.true(stats.total > 0);
	t.true(stats.last24h > 0);
	t.true(stats.saleVelocityPerSeconds > 0);
});

test.serial('session', async t => {
	// Very rate limited, wait a minute between tests
	// 1,000,000th copy of Minecraft has a cape
	const profileId = 'd90b68bc81724329a047f1186dcd4336';
	const details = await session.session(profileId);
	t.is(details.name, 'akronman1');
	t.false(details.slim);
	t.truthy(details.skin);
	t.truthy(details.cape);
	t.is(details.textures.profileId, profileId);
	t.is(details.textures.signatureRequired, undefined);
	t.true(details.textures.timestamp >= 1555887602101);
});

test.serial('blockedServers', async t => {
	const sha1s = await session.blockedServers();
	t.is(sha1s[0].length, 40);
});
