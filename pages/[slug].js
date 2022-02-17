import NextLink from "next/link";

import { storyblokConnection } from "../utilities/storyblok";

import { SLUG_QUERY } from "../graphql/storyblok/slug";

import AtomsCode from "../components/atoms/code";

export default function PageAbout({ variables, storyblok }) {
    return (
        <div className="container">
            <div className="my-4 text-center">
                <h1>about</h1>
                <NextLink href="/">
                    <a>Home</a>
                </NextLink>
            </div>
            <AtomsCode content={variables} />
            <AtomsCode content={storyblok} />
        </div>
    );
}

export async function getServerSideProps({ res, params }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    const paramSlug = params.slug;

    const variables = {
        slug: paramSlug,
    };

    const storyblokCall = await storyblokConnection
        .request(SLUG_QUERY, variables)
        .then((data) => data.TemplatedefaultItem);

    return {
        props: {
            variables,
            storyblok: storyblokCall,
        },
    };
}
