import got from "./mojang-got";

export interface SecurityQuestion {
    answer: {
        /** Must be paired later with answer text */
        id: number;
    };
    question: {
        /** Enum value for question text */
        id: number;
        /** Text of question to show to user */
        question: string;
    };
}

export interface SecurityAnswer {
    /** Re-use the answer ID from a security question */
    id: number;
    /** User-provided text */
    answer: string;
}

/**
 * Get whether or not current IP is trusted.
 *
 * @see {@link http://wiki.vg/Mojang_API#Check_if_security_questions_are_needed}
 */
export async function isTrusted(accessToken: string) {
    try {
        await got.get("user/security/location", { context: { accessToken } });

        // 204 response means trusted IP
        return true;
    } catch (error) {
        const { response } = error;

        // Handle untrusted IP gracefully
        if (response && response.statusCode === 403) {
            return false;
        }

        // Otherwise let error bubble
        throw error;
    }
}

/**
 * Get challenge questions for the Mojang account.
 *
 * @see {@link http://wiki.vg/Mojang_API#Get_list_of_questions}
 */
export async function challenges(accessToken: string) {
    return got
        .get("user/security/challenges", { context: { accessToken } })
        .json<SecurityQuestion[]>();
}

/**
 * Submit challenge questions for the Mojang account.
 *
 * @see {@link http://wiki.vg/Mojang_API#Send_back_the_answers}
 */
export async function answers(accessToken: string, json: SecurityAnswer[]) {
    await got.post("user/security/location", {
        context: { accessToken },
        json,
    });
}
