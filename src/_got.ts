import got from 'got';
import pkg from '../package.json';

const userAgent = `${pkg.name}/${pkg.version} (${pkg.bugs})`;

export default got.extend({
	headers: {'user-agent': userAgent},
	responseType: "json",
	hooks: {
		beforeRequest: [
			options => {
				const {accessToken} = options.context;
				if (accessToken) {
					options.headers.Authorization = `Bearer ${accessToken}`;
				}
			}
		]
	}
});
