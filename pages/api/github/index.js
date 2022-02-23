import { githubConnection } from "../../../utilities/api/github";

import { REPO_QUERY } from "../../../graphql/github/repo";

export default async function handler(_req, res) {
    const { data, errors } = await githubConnection.rawRequest(REPO_QUERY);

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), res.status(400).json(errors);
    }

    return res.status(200).json(data);
}
