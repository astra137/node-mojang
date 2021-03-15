const realms = require('../dist/realms');

const session = {
	clientToken: 'e0aba9f9a0544055a67a8e9c2e1d22fa',
	accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMGE4Y2YwMzc3ZjI1ZDYyMTgzMjlhMGFkNmM5NmEyOSIsInlnZ3QiOiI0MTQ0NTcwMGQ1ZDg0MjkxOGE3OTljMmJmNDlmODZiZiIsInNwciI6IjliMTJiN2RhYTU1NTQyYTY4OTE5MjlhYWY2NjMzZjFhIiwiaXNzIjoiWWdnZHJhc2lsLUF1dGgiLCJleHAiOjE2MDQ2Mzg5NjUsImlhdCI6MTYwNDQ2NjE2NX0.Ty5yRThJag539Cb4AC5tuK4b0GXBpD023ZEJWN9Fog8',
	selectedProfile: {
		id: '9b12b7daa55542a6891929aaf6633f1a',
		name: 's4x3'
	}
};

(async () => {
	console.dir(await realms.mcoAvailable(session));
	console.dir(await realms.mcoCompatible(session));
	console.dir(await realms.trial(session));

	const worlds = await realms.worlds(session);
	console.dir(worlds.servers[0].id);

	const world = await realms.world(session, worlds.servers[0].id);
	console.dir(world.id);
})();
