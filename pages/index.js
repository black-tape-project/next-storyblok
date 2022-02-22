import NextHead from "next/head";
import NextLink from "next/link";

import { NextSeo } from "next-seo";

import useSWR from "swr";

import { render } from "storyblok-rich-text-react-renderer";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import dayjs from "dayjs";

import { generateCanonicalUrl } from "../functions/url";

export default function PageIndex({ fallback }) {
    const { data: github, error: githubError } = useSWR("/api/github", {
        fallbackData: fallback.github,
    });

    const { data: storyblok, error: storyblokError } = useSWR(
        "/api/storyblok/home",
        { fallbackData: fallback.storyblok }
    );

    return (
        <>
            <NextHead>
                <link
                    rel="preload"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/api/github`}
                    as="fetch"
                    crossOrigin="anonymous"
                ></link>
                <link
                    rel="preload"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/api/storyblok/home`}
                    as="fetch"
                    crossOrigin="anonymous"
                ></link>
            </NextHead>

            <NextSeo
                title={storyblok?.content?.seo_title}
                description={storyblok?.content?.seo_description}
                canonical={generateCanonicalUrl(storyblok?.slug)}
                noindex={storyblok?.content?.seo_index}
                nofollow={storyblok?.content?.seo_follow}
                openGraph={{
                    url: generateCanonicalUrl(storyblok?.slug),
                    title: storyblok?.content?.seo_title,
                    description: storyblok?.content?.seo_description,
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
                    {storyblok && (
                        <>
                            <h1 data-cy="title" className="lowercase">
                                {storyblok?.content?.title}
                            </h1>
                            <div>{render(storyblok?.content?.intro)}</div>
                            <p className="text-xs uppercase">
                                Last Updated{" "}
                                {dayjs(storyblok?.published_at).format("LL")}
                            </p>
                        </>
                    )}
                    <NextLink href="/about-us">
                        <a>About</a>
                    </NextLink>
                </div>
                {github && <AtomsCode content={github} />}
                {storyblok && <AtomsCode content={storyblok} />}
            </div>
        </>
    );
}

PageIndex.getLayout = function getLayout(Page) {
    return <LayoutTemplateDefault>{Page}</LayoutTemplateDefault>;
};

export async function getStaticProps() {
    try {
        const github = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/github`
        );

        const githubData = await github.json();

        const storyblok = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/storyblok/home`
        );

        const storyblokData = await storyblok.json();

        return {
            props: {
                fallback: {
                    github: githubData,
                    storyblok: storyblokData,
                },
            },
        };
    } catch (err) {
        // TODO (Change to 500 error page?)
        return {
            notFound: true,
        };
    }
}
