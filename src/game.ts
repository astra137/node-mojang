import got from "./_got";

interface VersionManifest {
    latest: {
        release: string;
        snapshot: string;
    };
    versions: [
        {
            id: string;
            type: string;
            url: string;
            time: string;
            releaseTime: string;
        }
    ];
}

interface Rule {
    action: "allow" | "disallow";
    os?: {
        name: string;
    };
}

interface ConditionalArgument {
    rules: [Rule];
    value: string | [string];
}

type Argument = string | ConditionalArgument;

interface Artifact {
    path: string;
    sha1: string;
    size: number;
    url: string;
}

interface Version {
    arguments?: {
        game: [Argument];
        jvm: [Argument];
    };
    assetIndex: {
        id: string;
        sha1: string;
        size: number;
        totalSize: number;
        url: string;
    };
    assets: string;
    complianceLevel?: number;
    downloads: {
        client: {
            sha1: string;
            size: number;
            url: string;
        };
        client_mappings?: {
            sha1: string;
            size: number;
            url: string;
        };
        server?: {
            sha1: string;
            size: number;
            url: string;
        };
        server_mappings?: {
            sha1: string;
            size: number;
            url: string;
        };
    };
    id: string;
    libraries: [
        {
            name: string;
            downloads: {
                artifact: Artifact;
                classifiers?: {
                    [index: string]: Artifact;
                };
            };
            rules?: [Rule];
            /** values refer to downloads.classifiers keys */
            natives?: {
                osx?: string;
                linux?: string;
                windows?: string;
            };
            extract?: {
                exclude: string[];
            };
        }
    ];
    logging?: {
        client: {
            argument: string;
            file: {
                id: string;
                sha1: string;
                size: string;
                url: string;
            };
            type: string;
        };
    };
    mainClass: string;

    /** @deprecated */
    minecraftArguments?: string;

    minimumLauncherVersion: number;
    releaseTime: string;
    time: string;
    type: "release" | "snapshot" | "old_beta" | "old_alpha";
}

interface AssetIndex {
    objects: {
        [index: string]: {
            hash: string;
            size: number;
        };
    };
}

/**
 * Get a list of all Minecraft versions.
 *
 * @see {@link https://wiki.vg/Game_files#Game}
 */
export async function getVersionManifest() {
    return got
        .get("https://launchermeta.mojang.com/mc/game/version_manifest.json")
        .json<VersionManifest>();
}

/**
 * Get a specific Minecraft version's details, including libraries, assets, and more.
 *
 * @see {@link https://wiki.vg/Game_files#Game}
 */
export async function getVersion(manifest: VersionManifest, id: string) {
    const version = manifest.versions.find((v) => v.id === id);
    if (version) {
        return got.get(version.url).json<Version>();
    } else {
        throw new Error(`version ${id} is not in manifest`);
    }
}
