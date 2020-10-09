import mojang from "./mojang-got";

const got = mojang.extend({
    prefixUrl: "https://status.mojang.com",
});

/* eslint-disable no-unused-vars */
export enum StatusColor {
    green = "green",
    yellow = "yellow",
    red = "red",
}
/* eslint-enable no-unused-vars */

export type StatusDictionary = { [key: string]: StatusColor };

/**
 * Get the Mojang status check response, reformatted.
 *
 * @returns Flattened dictionary of hostnames and colors
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
export async function status() {
    const sites = await got.get("check").json<StatusDictionary[]>();
    const flattened: StatusDictionary = {};
    for (const site of sites) {
        const name = Object.keys(site)[0];
        flattened[name] = site[name];
    }
    return flattened;
}
