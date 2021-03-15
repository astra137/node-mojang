import got from "./_got";
import { Session } from "./yggdrasil";

const VERSION = "1.16.4";

const api = got.extend({
    prefixUrl: "https://pc.realms.minecraft.net",
    hooks: {
        beforeRequest: [
            (options) => {
                const session = options.context.session as Session;
                if (session) {
                    const { accessToken } = session;
                    const user = session.selectedProfile?.name;
                    const id = session.selectedProfile?.id;
                    options.headers.Cookie = `sid=token:${accessToken}:${id};user=${user};version=${VERSION};`;
                }
            },
        ],
    },
});

interface Server {
    id: number;
    remoteSubscriptionId: string;
    owner: string;
    ownerUUID: string;
    name: string;
    motd: string;
    defaultPermission: string;
    state: string;
    daysLeft: number;
    expired: boolean;
    expiredTrial: boolean;
    gracePeriod: boolean;
    worldType: string;
    players: string[] | null;
    maxPlayers: number;
    minigameName: any;
    minigameId: any;
    minigameImage: any;
    activeSlot: number;
    slots: any;
    member: boolean;
    clubId: any;
}

/** */
export async function mcoAvailable(session: Session) {
    const text = await api
        .get("mco/available", { context: { session } })
        .text();
    return text === "true";
}

/** */
export async function mcoCompatible(session: Session) {
    const text = await api
        .get("mco/client/compatible", { context: { session } })
        .text();
    return text as "OUTDATED" | "OTHER" | "COMPATIBLE";
}

/** */
export async function trial(session: Session) {
    const text = await api.get("trial", { context: { session } }).text();
    return text === "true";
}

/**  */
export async function worlds(session: Session) {
    return api.get("worlds", { context: { session } }).json<Server[]>();
}

/**  */
export async function world(session: Session, id: number) {
    return api.get(`worlds/${id}`, { context: { session } }).json<Server[]>();
}
