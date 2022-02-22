import { githubConnection } from "../../../utilities/api/github";

import { REPO_QUERY } from "../../../graphql/github/repo";

export default async function handler(_request, response) {
    const { data, errors, headers } = await githubConnection.rawRequest(
        REPO_QUERY
    );

    response.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), response.status(400).json(errors);
    }

    return response.status(200).json(data);
}
