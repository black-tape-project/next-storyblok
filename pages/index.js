import NextLink from "next/link";

import { NextSeo } from "next-seo";

import { githubConnection } from "../utilities/github";
import { storyblokConnection } from "../utilities/storyblok";

import { REPO_QUERY } from "../graphql/github/repo";
import { HOME_QUERY } from "../graphql/storyblok/home";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/layout/default";

import dayjs from "dayjs";

import { generateCanonicalUrl } from "../functions/url";

export default function PageIndex({ github, storyblok }) {
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

            {/* <SocialProfileJsonLd
                type={process.env.NEXT_PUBLIC_SCHEMA_SITE_TYPE}
                name={process.env.NEXT_PUBLIC_SCHEMA_SITE_NAME}
                url={process.env.NEXT_PUBLIC_SCHEMA_SITE_URL}
                sameAs={[
                    process.env.NEXT_PUBLIC_SOCIAL_TWITCH_URL,
                    process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL,
                ]}
            /> */}

            <div className="container">
                <div className="my-4 text-center">
                    <h1>{process.env.NEXT_PUBLIC_SCHEMA_SITE_NAME}</h1>
                    <p className="intro">Intro</p>
                    <p className="text-xs uppercase">
                        Last Updated{" "}
                        {dayjs(storyblok.published_at).format("LL")}
                    </p>
                    <NextLink href="/about-us">
                        <a>About</a>
                    </NextLink>
                </div>
                <AtomsCode content={github} />
                <AtomsCode content={storyblok} />
            </div>
        </>
    );
}

PageIndex.getLayout = function getLayout(Page) {
    return <LayoutTemplateDefault>{Page}</LayoutTemplateDefault>;
};

export async function getServerSideProps({ res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=60"
    );

    const githubCall = await githubConnection
        .request(REPO_QUERY)
        .then((data) => data.repository);

    const storyblokCall = await storyblokConnection
        .request(HOME_QUERY)
        .then((data) => data.TemplateindexItem);

    return {
        props: {
            github: githubCall,
            storyblok: storyblokCall,
        },
    };
}
