import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { SLUG_PATHS_QUERY } from "../../../../graphql/storyblok/slug";

export default async function handler(_req, res) {
    const { data, errors } = await storyblokConnection.rawRequest(
        SLUG_PATHS_QUERY
    );

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), res.status(400).json(errors);
    }

    const storyblokSlugPathsData = data.TemplatedefaultItems;

    return res.status(200).json(storyblokSlugPathsData);
}
