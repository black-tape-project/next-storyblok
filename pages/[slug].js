import NextLink from "next/link";

import { NextSeo } from "next-seo";

import { storyblokConnection } from "../utilities/storyblok";

import { SLUG_QUERY } from "../graphql/storyblok/slug";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import dayjs from "dayjs";

import { generateCanonicalUrl } from "../functions/url";

export default function PageAbout({ variables, storyblok }) {
    return (
        <>
            <NextSeo
                title={storyblok.content.seo_title}
                description={storyblok.content.seo_description}
                canonical={generateCanonicalUrl(storyblok.slug)}
                noindex={storyblok.content.seo_index}
                nofollow={storyblok.content.seo_follow}
                openGraph={{
                    url: generateCanonicalUrl(storyblok.slug),
                    title: storyblok.content.seo_title,
                    description: storyblok.content.seo_description,
                }}
            />

            <div className="container">
                <div className="my-4 text-center">
                    <h1 data-cy="title" className="lowercase">
                        {storyblok.name}
                    </h1>
                    <p className="intro intro--red">Intro</p>
                    <p className="text-xs uppercase">
                        Last Updated{" "}
                        {dayjs(storyblok.published_at).format("LL")}
                    </p>
                    <NextLink href="/">
                        <a>Home</a>
                    </NextLink>
                </div>
                <AtomsCode content={variables} />
                <AtomsCode content={storyblok} />
            </div>
        </>
    );
}

PageAbout.getLayout = function getLayout(Page) {
    return <LayoutTemplateDefault>{Page}</LayoutTemplateDefault>;
};

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
