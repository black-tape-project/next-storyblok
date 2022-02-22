// import NextError from "next/error";
import NextLink from "next/link";
import NextHead from "next/head";

import { NextSeo } from "next-seo";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import dayjs from "dayjs";

import { generateCanonicalUrl } from "../functions/url";

export default function PageIndex({ github, storyblok }) {
    return (
        <>
            <NextHead>
                <link
                    rel="preload"
                    href={process.env.NEXT_PUBLIC_APP_URL + "/api/github"}
                    as="fetch"
                    crossOrigin="anonymous"
                ></link>
                <link
                    rel="preload"
                    href={
                        process.env.NEXT_PUBLIC_APP_URL + "/api/storyblok/home"
                    }
                    as="fetch"
                    crossOrigin="anonymous"
                ></link>
            </NextHead>

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
                    <h1 data-cy="title" className="lowercase">
                        {process.env.NEXT_PUBLIC_SCHEMA_SITE_NAME}
                    </h1>
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

export async function getServerSideProps(context) {
    let github = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/github");
    github = await github.json();

    let storyblok = await fetch(
        process.env.NEXT_PUBLIC_APP_URL + "/api/storyblok/home"
    );
    storyblok = await storyblok.json();

    // if (!data) {
    //     return {
    //         notFound: true,
    //     };
    // }

    return {
        props: {
            github,
            storyblok,
        },
    };
}
