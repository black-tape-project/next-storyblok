import { useEffect, useState } from "react";

import { GraphQLClient } from "graphql-request";

import { storyblokInit, useStoryblokBridge } from "@storyblok/js";

export const storyblokConnection = (version) => {
    let storyblokToken = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN_PUBLIC;

    if (version == "draft") {
        storyblokToken = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN_PREVIEW;
    }

    return new GraphQLClient(process.env.STORYBLOK_API_URL, {
        headers: {
            token: storyblokToken,
            version: version,
        },
    });
};

export function useStoryblok(originalStory, preview) {
    let [story, setStory] = useState(originalStory);

    const storyId = story.id;

    function PreviewMode(id) {
        useStoryblokBridge(id, (story) => setStory(story));
    }

    useEffect(() => {
        setStory(originalStory);

        const existingScript = document.getElementById(
            "storyblok-javascript-bridge"
        );

        if (!existingScript) {
            storyblokInit({});
        }

        if (preview) {
            PreviewMode(storyId);
        }
    }, [originalStory, preview, storyId]);

    return story;
}
