import got from "./_got";

const statusApi = got.extend({
    prefixUrl: "https://status.mojang.com",
});

const mojangApi = got.extend({
    prefixUrl: "https://api.mojang.com",
});

export type StatusDictionary = { [key: string]: "green" | "yellow" | "red" };

/**
 * Get the Mojang status check response, reformatted.
 *
 * @returns Flattened dictionary of hostnames and colors
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
export async function status() {
    const sites = await statusApi.get("check").json<StatusDictionary[]>();

    const flattened: StatusDictionary = {};
    for (const site of sites) {
        const name = Object.keys(site)[0];
        flattened[name] = site[name];
    }

    return flattened;
}

export interface Profile {
    /** Profile UUID */
    id: string;
    /** In-game name */
    name: string;
    legacy?: boolean;
    demo?: boolean;
}

/**
 * Get the profile related to an in-game name.
 *
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time}
 */
export async function username(name: string, agent = "minecraft") {
    const route = `users/profiles/${agent}/${name}`;
    // Date field doesn't seem to work anymore
    // https://bugs.mojang.com/browse/WEB-3367
    //const seconds = date === undefined ? 0 : Math.floor(date.valueOf() / 1e3);
    //const query = seconds ? `${route}?at=${seconds}` : route;
    return mojangApi.get(route).json<Profile[]>();
}

/**
 * Get a (limited) list of profiles for the given in-game names.
 *
 * @see {@link http://wiki.vg/Mojang_API#Playernames_-.3E_UUIDs}
 */
export async function usernames(names: string[], agent = "minecraft") {
    return mojangApi.post(`profiles/${agent}`, { json: names }).json<Profile[]>();
}

/**
 * Get in-game name (and maybe more details) of a profile. Undocumented.
 */
export async function profile(id: string) {
    return mojangApi.get(`user/profile/${id}`).json<Profile>();
}

export interface PastName {
    /** In-game username */
    name: string;
    /** Unix milliseconds */
    changedToAt?: number;
}

/**
 * Get all previous names for a given profile.
 *
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
export async function history(id: string) {
    return mojangApi.get(`user/profiles/${id}/names`).json<PastName[]>();
}

/**
 * Get statistics on the sales of Minecraft.
 *
 * @param {String[]} metricKeys - Check link for allowed values
 * @see {@link http://wiki.vg/Mojang_API#Statistics}
 */
export async function statistics(metricKeys: string[]) {
    return mojangApi
        .post("orders/statistics", { json: { metricKeys } })
        .json<{
            total: number;
            last24h: number;
            saleVelocityPerSeconds: number;
        }>();
}
