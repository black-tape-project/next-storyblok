import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { HOME_QUERY } from "../../../../graphql/storyblok/home";

export default async function handler(_req, res) {
    const { data, errors } = await storyblokConnection.rawRequest(HOME_QUERY);

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), v.status(400).json(errors);
    }

    const storyblokHomeData = data.TemplateindexItem;

    return res.status(200).json(storyblokHomeData);
}
