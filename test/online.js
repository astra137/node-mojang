const { createReadStream } = require("fs");
const { finished } = require("stream");

const test = require("ava");
const got = require("got");
const { JWT } = require("jose");

const mojang = require("..");

const {
    MOJANG_USERNAME,
    MOJANG_PASSWORD,
    MOJANG_CLIENTTOKEN,
    MOJANG_ANSWER1,
    MOJANG_ANSWER2,
    MOJANG_ANSWER3,
    MOJANG_PROFILE_ID,
    MOJANG_SKIN_FILE,
} = process.env;

async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

test.beforeEach(async () => {
    await delay(1000);
});

/*

First up, the status check endpoint.

*/

test.serial("status()", async (t) => {
    const status = await mojang.status();
    t.is(Object.keys(status).length, 8);
    t.regex(status["minecraft.net"], /green|yellow|red/g);
    t.regex(status["session.minecraft.net"], /green|yellow|red/g);
    t.regex(status["account.mojang.com"], /green|yellow|red/g);
    t.regex(status["authserver.mojang.com"], /green|yellow|red/g);
    t.regex(status["sessionserver.mojang.com"], /green|yellow|red/g);
    t.regex(status["api.mojang.com"], /green|yellow|red/g);
    t.regex(status["textures.minecraft.net"], /green|yellow|red/g);
    t.regex(status["mojang.com"], /green|yellow|red/g);
});

/*

Unauthenticated requests for Minecraft usernames and profiles.

*/

test.serial("username", async (t) => {
    const { id, name } = await mojang.username("Cannabis");
    t.is(id, "7fff9c4fff1349babeb2acc9c2747725");
    t.is(name, "Cannabis");
});

test.serial("username with date", async (t) => {
    const { id, name } = await mojang.username(
        "RamenMarz",
        new Date("1-1-2016")
    );
    t.is(id, "7fff9c4fff1349babeb2acc9c2747725");
    t.is(name, "Cannabis");
});

test.serial("username does not exist", async (t) => {
    const profile = await mojang.username("ea1eb0554866");
    t.falsy(profile);
});

test.serial("usernames batch", async (t) => {
    const list = await mojang.usernames([
        // Some Mojang staff
        "dinnerbone",
        "searge",
        "krisjelbring",
        "evilseph",
    ]);
    t.deepEqual(list, [
        // List order is different than requested
        { id: "696a82ce41f44b51aa31b8709b8686f0", name: "Searge" },
        { id: "7125ba8b1c864508b92bb5c042ccfe2b", name: "KrisJelbring" },
        { id: "61699b2ed3274a019f1e0ea8c3f06bc6", name: "Dinnerbone" },
        { id: "020242a17b9441799eff511eea1221da", name: "EvilSeph" },
    ]);
});

test.serial("usernames batch with unknown name", async (t) => {
    const list = await mojang.usernames(["dinnerbone", "ea1eb0554866"]);
    // List does not contain a profile for unknown in-game name
    t.deepEqual(list, [
        { id: "61699b2ed3274a019f1e0ea8c3f06bc6", name: "Dinnerbone" },
    ]);
});

test.serial("profile", async (t) => {
    const id = "af74a02d19cb445bb07f6866a861f783";
    const profile = await mojang.profile(id);
    t.deepEqual(profile, { id, name: "md_5" });
});

test.serial("profile does not exist", async (t) => {
    const id = "7fa9a6a2532040628d6401b881f445f2";
    const profile = await mojang.profile(id);
    t.falsy(profile);
});

test.serial("history", async (t) => {
    const id = "ae795aa86327408e92ab25c8a59f3ba1";
    const list = await mojang.history(id);
    t.deepEqual(list, [
        { name: "redstone_sheep" },
        { name: "jomo", changedToAt: 1423060971000 },
    ]);
});

test.serial("history does not exist", async (t) => {
    const id = "7fa9a6a2532040628d6401b881f445f2";
    const list = await mojang.history(id);
    t.falsy(list);
});

test.serial("statistics", async (t) => {
    const stats = await mojang.statistics([
        "item_sold_minecraft",
        "prepaid_card_redeemed_minecraft",
        "item_sold_cobalt",
        "item_sold_scrolls",
    ]);
    t.true(stats.total > 0);
    t.true(stats.last24h > 0);
    t.true(stats.saleVelocityPerSeconds > 0);
});

/*

Session server

*/

test.serial("session", async (t) => {
    // Very rate limited, wait a minute between tests
    // 1,000,000th copy of Minecraft has a cape
    const profileId = "d90b68bc81724329a047f1186dcd4336";
    const details = await mojang.session(profileId);
    t.is(details.name, "akronman1");
    t.false(details.slim);
    t.truthy(details.skin);
    t.truthy(details.cape);
    t.is(details.textures.profileId, profileId);
    t.is(details.textures.signatureRequired, undefined);
    t.true(details.textures.timestamp >= 1555887602101);
});

test.serial("blockedServers", async (t) => {
    const sha1s = await mojang.blockedServers();
    t.is(sha1s[0], "72fd29f430c91c583bb7216fe673191dc25a7e18");
});

/*

Yggdrasil authentication service.

*/

test.serial("authenticate with invalid credentials", async (t) => {
    try {
        await mojang.authenticate("test", "test", MOJANG_CLIENTTOKEN);
        t.fail();
    } catch (error) {
        // https://github.com/sindresorhus/got#errors
        t.is(error.name, "HTTPError");
        t.is(error.response.statusCode, 403);
        // https://wiki.vg/Authentication#Errors
        t.is(error.response.body.error, "ForbiddenOperationException");
        t.is(
            error.response.body.errorMessage,
            "Invalid credentials. Invalid username or password."
        );
    }
});

test.serial("validate with invalid token", async (t) => {
    t.false(
        await mojang.validate({
            accessToken: "not a token",
            clientToken: MOJANG_CLIENTTOKEN,
        })
    );
});

test.serial("invalidate with invalid token", async (t) => {
    await t.notThrowsAsync(
        mojang.invalidate({
            accessToken: "not a token",
            clientToken: MOJANG_CLIENTTOKEN,
        })
    );
});

test.serial("authentication workflow", async (t) => {
    // Create Minecraft session with user
    const s1 = await mojang.authenticate(
        MOJANG_USERNAME,
        MOJANG_PASSWORD,
        MOJANG_CLIENTTOKEN,
        "Minecraft"
    );

    t.is(s1.clientToken, MOJANG_CLIENTTOKEN);
    t.true("accessToken" in s1);
    t.true("selectedProfile" in s1);
    t.true("user" in s1);
    t.true("sub" in JWT.decode(s1.accessToken));

    await delay(1000);

    // Check session is valid
    t.true(await mojang.validate(s1));

    await delay(1000);

    // Refresh and get new session
    const s2 = await mojang.refresh(s1);

    t.true("accessToken" in s2);
    t.true("selectedProfile" in s2);
    t.true("sub" in JWT.decode(s2.accessToken));
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

test.serial("security workflow", async (t) => {
    // Log into account
    const { accessToken } = await mojang.authenticate(
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
            answer: MOJANG_ANSWER1,
        },
        {
            id: challenges[1].answer.id,
            answer: MOJANG_ANSWER2,
        },
        {
            id: challenges[2].answer.id,
            answer: MOJANG_ANSWER3,
        },
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

test.serial("skin workflow", async (t) => {
    t.timeout(2 * 60 * 1000);

    // Log into account
    const { accessToken } = await mojang.authenticate(
        MOJANG_USERNAME,
        MOJANG_PASSWORD,
        MOJANG_CLIENTTOKEN
    );

    // Ensure IP is "secure" (from above) and skin uploads will work
    t.true(await mojang.isTrusted(accessToken));

    // Test URL version of skin API
    const skinAlexUrl = "http://assets.mojang.com/SkinTemplates/alex.png";
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
