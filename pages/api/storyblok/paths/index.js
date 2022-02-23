import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { SLUG_PATHS_QUERY } from "../../../../graphql/storyblok/slug";

export default async function handler(_request, response) {
    const { data, errors } = await storyblokConnection.rawRequest(
        SLUG_PATHS_QUERY
    );

    response.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), response.status(400).json(errors);
    }

    const storyblokSlugPathsData = data.TemplatedefaultItems;

    return response.status(200).json(storyblokSlugPathsData);
}
