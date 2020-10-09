import { Base64 } from "js-base64";

import mojang from "./mojang-got";

const got = mojang.extend({
    prefixUrl: "https://sessionserver.mojang.com",
});

interface SessionResponse {
    id: string;
    name: string;
    properties: [
        {
            name: string;
            /** Base64 */
            value: string;
            /** Base64; signed data using Yggdrasil's private key */
            signature?: string;
        }
    ];
}

interface TexturesObject {
    /** Java time in ms */
    timestamp: number;
    profileId: string;
    profileName: string;
    signatureRequired?: boolean;
    /** Decoded, JSON.parse'd textures property */
    textures: {
        SKIN?: {
            url: string;
            metadata?: {
                model: string;
            };
        };
        CAPE?: {
            url: string;
        };
    };
}

/**
 * Get the player's username, skin, and cape information.
 * **Extremely rate limited.** See wiki.vg.
 *
 * @param id - Profile UUID
 * @param signed - When true, result includes Yggdrasil signature data
 * @see {@link https://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
export async function session(id: string, signed = false) {
    const query = signed ? "?unsigned=false" : "";
    const route = `session/minecraft/profile/${id}${query}`;
    const { name, properties } = await got.get(route).json<SessionResponse>();
    const { value, signature } = properties.find((p) => p.name === "textures")!;
    const textures: TexturesObject = JSON.parse(Base64.decode(value));
    return {
        name,
        slim: textures.textures.SKIN?.metadata?.model === "slim",
        skin: textures.textures.SKIN?.url,
        cape: textures.textures.CAPE?.url,
        textures,
        signature,
    };
}

/**
 * Get a list of SHA1 hashes of server addresses.
 *
 * @see {@link http://wiki.vg/Mojang_API#Blocked_Servers}
 */
export async function blockedServers() {
    const body = await got
        .get("blockedservers", { responseType: "text" })
        .text();
    return body.split("\n").slice(0, -1);
}
