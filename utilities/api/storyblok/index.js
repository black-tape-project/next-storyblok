import { useEffect, useState } from "react";

import { GraphQLClient } from "graphql-request";

import { storyblokInit, useStoryblokBridge } from "@storyblok/js";

export const storyblokConnection = new GraphQLClient(
    process.env.STORYBLOK_API_URL,
    {
        headers: {
            token: process.env.STORYBLOK_API_TOKEN,
            // TODO (Find way to push version to the api version based up preview.)
            // - May require an api call method change.
            // ! Running of "draft" for now.
            version: "draft",
        },
    }
);

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
