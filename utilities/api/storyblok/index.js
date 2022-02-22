import { GraphQLClient } from "graphql-request";

export const storyblokConnection = new GraphQLClient(
    process.env.STORYBLOK_API_URL,
    {
        headers: {
            token: process.env.STORYBLOK_API_TOKEN,
            version: process.env.STORYBLOK_API_VERSION,
        },
    }
);
