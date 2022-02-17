import { GraphQLClient } from "graphql-request";

export const githubConnection = new GraphQLClient(process.env.GITHUB_API_URL, {
    headers: {
        authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
});
