import { storyblokConnection } from "../../../../utilities/api/storyblok";

import { SLUG_QUERY } from "../../../../graphql/storyblok/slug";

export default async function handler(req, res) {
    const slug = req.query;

    const { data, errors } = await storyblokConnection(
        req.query.version
    ).rawRequest(SLUG_QUERY, slug);

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    if (errors) {
        return console.error(errors);
        // return console.error(errors), res.status(400).json(errors);
    }

    const storyblokSlugData = data.TemplatedefaultItem;

    return res.status(200).json(storyblokSlugData);
}
