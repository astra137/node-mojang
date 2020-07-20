import mojang from "./mojang-got";

// eslint-disable-next-line no-unused-vars
import { HTTPError } from "got/dist/source";

// eslint-disable-next-line no-unused-vars
import { Profile } from "./mojang";

const got = mojang.extend({
    prefixUrl: "https://authserver.mojang.com"
});

/* eslint-disable no-unused-vars */
enum MojangGame {
    Minecraft = "Mincraft",
    Scrolls = "Scrolls"
}
/* eslint-enable no-unused-vars */

interface YggdrasilResponse {
    /** Use and re-use tdfhe uuid v4 for a client instance */
    clientToken: string;
    /** JWT containing acess token and other details */
    accessToken: string;
    availableProfiles?: Profile[];
    selectedProfile?: Profile;
    user: {
        id: string;
        email: string;
    };
}

/**
 * Authenticate a user using their password.
 *
 * @param username - Mojang account email (username for legacy accounts)
 * @param password - Mojang account secret
 * @param clientToken - UUID v4 identifier, must not change during session
 * @param agent - Which game to start session for, such as "Minecraft" or "Scrolls"
 * @see {@link http://wiki.vg/Authentication#Authenticate}
 */
export function authenticate(
    username: string,
    password: string,
    clientToken: string,
    agent?: MojangGame
) {
    return got
        .post("authenticate", {
            json: {
                username,
                password,
                clientToken,
                agent: agent ? { name: agent, version: 1 } : undefined,
                requestUser: true
            }
        })
        .json<YggdrasilResponse>();
}

/**
 * Refresh a valid accessToken.
 *
 * @see {@link http://wiki.vg/Authentication#Refresh}
 */
export function refresh(accessToken: string, clientToken: string) {
    return got
        .post("refresh", { json: { accessToken, clientToken } })
        .json<YggdrasilResponse>();
}

/**
 * Check if the access token is suitable for use with a game server.
 *
 * @see {@link http://wiki.vg/Authentication#Validate}
 */
export async function validate(accessToken: string, clientToken: string) {
    try {
        await got.post("validate", { json: { accessToken, clientToken } });

        // 204
        return true;
    } catch (error) {
        const { response } = error as HTTPError;

        // Handle Invalid token gracefully
        if (response && response.statusCode === 403) {
            return false;
        }

        // Otherwise let error bubble
        throw error;
    }
}

/**
 * Invalidates accessTokens using a client/access token pair.
 *
 * @see {@link http://wiki.vg/Authentication#Invalidate}
 */
export async function invalidate(accessToken: string, clientToken: string) {
    await got.post("invalidate", {
        json: { accessToken, clientToken }
    });
}

/**
 * Invalidates accessTokens using an account's username and password.
 *
 * @see {@link http://wiki.vg/Authentication#Signout}
 */
export async function signout(username: string, password: string) {
    await got.post("signout", { json: { username, password } });
}
