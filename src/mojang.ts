import got from "./mojang-got";

export interface Profile {
    /** Profile UUID */
    id: string;
    /** In-game name */
    name: string;
    legacy?: boolean;
    demo?: boolean;
}

export interface PastName {
    /** In-game username */
    name: string;
    /** Unix milliseconds */
    changedToAt?: number;
}

export interface OrdersStatistics {
    total: number;
    last24h: number;
    saleVelocityPerSeconds: number;
}

/**
 * Get the profile related to an in-game name, optionally historical.
 *
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time}
 */
export async function username(name: string, date?: Date, agent = "minecraft") {
    const route = `users/profiles/${agent}/${name}`;
    const seconds = date === undefined ? 0 : Math.floor(date.valueOf() / 1e3);
    const query = seconds ? `${route}?at=${seconds}` : route;
    return got.get(query).json<Profile[]>();
}

/**
 * Get a (limited) list of profiles for the given in-game names.
 *
 * @see {@link http://wiki.vg/Mojang_API#Playernames_-.3E_UUIDs}
 */
export async function usernames(names: string[], agent = "minecraft") {
    return got.post(`profiles/${agent}`, { json: names }).json<Profile[]>();
}

/**
 * Get in-game name (and maybe more details) of a profile. Undocumented.
 */
export async function profile(id: string) {
    return got.get(`user/profile/${id}`).json<Profile>();
}

/**
 * Get all previous names for a given profile.
 *
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
export async function history(id: string) {
    return got.get(`user/profiles/${id}/names`).json<PastName[]>();
}

/* eslint-disable no-unused-vars */
export enum OrdersType {
    item_sold_minecraft = "item_sold_minecraft",
    prepaid_card_redeemed_minecraft = "prepaid_card_redeemed_minecraft",
    item_sold_cobalt = "item_sold_cobalt",
    item_sold_scrolls = "item_sold_scrolls"
}

/**
 * Get statistics on the sales of Minecraft.
 *
 * @param {String[]} metricKeys - Check link for allowed values
 * @see {@link http://wiki.vg/Mojang_API#Statistics}
 */
export async function statistics(metricKeys: OrdersType[]) {
    return got
        .post("orders/statistics", { json: { metricKeys } })
        .json<OrdersStatistics>();
}
