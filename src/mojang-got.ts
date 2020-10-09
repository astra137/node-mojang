import { join } from "path";
import { readFileSync } from "fs";
import got from "got";

const pkgPath = join(__dirname, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
const userAgent = `${pkg.name}/${pkg.version} (${pkg.bugs})`;

export default got.extend({
    headers: { "user-agent": userAgent },
    prefixUrl: "https://api.mojang.com",
    responseType: "json",
    hooks: {
        beforeRequest: [
            (options) => {
                const { accessToken } = options.context;
                if (accessToken) {
                    options.headers.Authorization = `Bearer ${accessToken}`;
                }
            },
        ],
    },
});
