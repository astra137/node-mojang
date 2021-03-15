import FormData from "form-data";
import got from "./_got";
import { Stream } from "stream";

const api = got.extend({
    prefixUrl: "https://api.mojang.com",
});

/**
 * Calculate if profile has Alex or Steve as a default skin (Crafatar's logic).
 *
 * @param id - Profile UUID
 * @see {@link https://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 * @see {@link https://github.com/crafatar/crafatar/blob/9d2fe0c45424de3ebc8e0b10f9446e7d5c3738b2/lib/skins.js#L90-L108}
 */
export function isAlex(id: string) {
    return (
        parseInt(id[7], 16) ^
        parseInt(id[15], 16) ^
        parseInt(id[23], 16) ^
        parseInt(id[31], 16)
    );
}

/**
 * Set a profile's in-game skin using an online image.
 *
 * @param accessToken - Access token from yggdrasil
 * @param id - Profile UUID belonging to same user
 * @param url - Internet-accessible URL of the skin image
 * @param slim - If true, skin will use slim character model
 * @see {@link http://wiki.vg/Mojang_API#Change_Skin}
 */
export async function setSkin(
    accessToken: string,
    profileId: string,
    url: string,
    slim = false
) {
    await api.post(`user/profile/${profileId}/skin`, {
        context: { accessToken },
        form: {
            model: slim ? "slim" : undefined,
            url,
        },
    });
}

/**
 * Set a profile's in-game skin using a file upload.
 *
 * @param accessToken - Access token from yggdrasil
 * @param id - Profile UUID belonging to same user
 * @param file - new skin's binary image data
 * @param slim - If true, skin will use slim character model
 * @see {@link http://wiki.vg/Mojang_API#Change_Skin}
 */
export async function uploadSkin(
    accessToken: string,
    profileId: string,
    file: Stream | Buffer,
    slim = false
) {
    const body = new FormData();
    body.append("model", slim ? "slim" : undefined);
    body.append("file", file);

    await api.put(`user/profile/${profileId}/skin`, {
        context: { accessToken },
        body,
    });
}

/**
 * Reset (delete) a profile's in-game skin.
 *
 * @param accessToken - Access token from yggdrasil
 * @param id - Profile UUID belonging to same user
 * @see {@link http://wiki.vg/Mojang_API#Reset_Skin}
 */
export async function resetSkin(accessToken: string, id: string) {
    await api.delete(`user/profile/${id}/skin`, { context: { accessToken } });
}
