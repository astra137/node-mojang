import got from "./mojang-got";

export interface PrivateProfile {
    agent: string;
    id: string;
    name: string;
    userId: string;
    createdAt: number;
    legacyProfile: boolean;
    suspended: boolean;
    paid: boolean;
    migrated: boolean;
}

/**
 * Get list of account's game profiles. Undocumented. Unreliable.
 * May require you to call isSecured() first?
 */
export async function profiles(accessToken: string) {
    return got
        .get(`user/profiles`, { context: { accessToken } })
        .json<PrivateProfile[]>();
}
