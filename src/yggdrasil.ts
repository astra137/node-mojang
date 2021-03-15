import got from "./_got";
import { HTTPError } from "got/dist/source";
import { Profile } from "./index";

const api = got.extend({
    prefixUrl: "https://authserver.mojang.com",
});

export interface Session {
    /** UUID v4 client identifier */
    clientToken: string;
    /** JWT containing access token and other details */
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
 * @param clientToken - Random identifier, defaults to server-generated UUID v4
 * @param agent - Game name to start session for: Minecraft or Scrolls.
 * @see {@link http://wiki.vg/Authentication#Authenticate}
 */
export function authenticate(
    username: string,
    password: string,
    clientToken?: string,
    agent = "Minecraft"
) {
    return api
        .post("authenticate", {
            json: {
                username,
                password,
                clientToken,
                agent: agent ? { name: agent, version: 1 } : undefined,
                requestUser: true,
            },
        })
        .json<Session>();
}

/**
 * Refresh a valid or recently valid access token.
 *
 * @note An accessToken may be unusable for authentication with a Minecraft server, but still be good enough for refresh.

 * @see {@link http://wiki.vg/Authentication#Refresh}
 */
export function refresh({ accessToken, clientToken }: Session) {
    return api
        .post("refresh", {
            json: { accessToken, clientToken, requestUser: true },
        })
        .json<Session>();
}

/**
 * Check if the access token is suitable for use with a game server.
 *
 * @see {@link http://wiki.vg/Authentication#Validate}
 */
export async function validate({ accessToken, clientToken }: Session) {
    try {
        await api.post("validate", { json: { accessToken, clientToken } });

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
 * Invalidate an access token, ending only this session.
 *
 * @see {@link http://wiki.vg/Authentication#Invalidate}
 */
export async function invalidate({ accessToken, clientToken }: Session) {
    await api.post("invalidate", { json: { accessToken, clientToken } });
}

/**
 * Invalidates access tokens using an account's username and password.
 *
 * @see {@link http://wiki.vg/Authentication#Signout}
 */
export async function signout(username: string, password: string) {
    await api.post("signout", { json: { username, password } });
}
