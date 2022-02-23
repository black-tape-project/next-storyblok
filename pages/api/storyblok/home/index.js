import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { HOME_QUERY } from "../../../../graphql/storyblok/home";

export default async function handler(_request, response) {
    const { data, errors } = await storyblokConnection.rawRequest(HOME_QUERY);

    response.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), response.status(400).json(errors);
    }

    const storyblokHomeData = data.TemplateindexItem;

    return response.status(200).json(storyblokHomeData);
}
