import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { SLUG_QUERY } from "../../../../graphql/storyblok/slug";

export default async function handler(request, response) {
    const slug = request.query;

    const { data, errors } = await storyblokConnection.rawRequest(
        SLUG_QUERY,
        slug
    );

    response.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), response.status(400).json(errors);
    }

    const storyblokHomData = data.TemplatedefaultItem;

    return response.status(200).json(storyblokHomData);
}
