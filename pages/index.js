import NextHead from "next/head";
import NextLink from "next/link";

import { NextSeo, SocialProfileJsonLd } from "next-seo";

import useSWR from "swr";

import { render } from "storyblok-rich-text-react-renderer";

import dayjs from "dayjs";

import { useStoryblok } from "../utilities/api/storyblok";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import StoryblokComponentUtility from "../components/storyblok/utilities";

import { generateCanonicalUrl } from "../functions/url";

export default function PageIndex({ preview, fallback }) {
    const enableBridge = preview;

    const { data: github, error: githubError } = useSWR("/api/github", {
        fallbackData: fallback.github,
    });

    let storyblokURL;

    if (preview) {
        storyblokURL = "/api/storyblok/home?version=draft";
    } else {
        storyblokURL = "/api/storyblok/home?version=published";
    }

    const { data: storyblok, error: storyblokError } = useSWR(storyblokURL, {
        fallbackData: fallback.storyblok,
    });

    let story = useStoryblok(storyblok, enableBridge);

    console.log("client preview", preview);

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
                    href={process.env.NEXT_PUBLIC_APP_URL + storyblokURL}
                    as="fetch"
                    crossOrigin="anonymous"
                ></link>
            </NextHead>

            <NextSeo
                title={story?.content?.seo_title}
                description={story?.content?.seo_description}
                canonical={generateCanonicalUrl(story?.slug)}
                noindex={story?.content?.seo_index}
                nofollow={story?.content?.seo_follow}
                openGraph={{
                    url: generateCanonicalUrl(story?.slug),
                    title: story?.content?.seo_title,
                    description: story?.content?.seo_description,
                }}
            />

            <SocialProfileJsonLd
                type={process.env.NEXT_PUBLIC_SCHEMA_SITE_TYPE}
                name={process.env.NEXT_PUBLIC_SCHEMA_SITE_NAME}
                url={process.env.NEXT_PUBLIC_APP_URL}
                sameAs={[
                    process.env.NEXT_PUBLIC_SOCIAL_TWITCH_URL,
                    process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL,
                ]}
            />

            <div className="container">
                <div className="my-4 text-center">
                    {storyblok && (
                        <>
                            <h1 data-cy="title" className="lowercase">
                                {story?.content?.title}
                            </h1>
                            <div>{render(story?.content?.intro)}</div>
                            <p className="text-xs uppercase">
                                Last Updated{" "}
                                {dayjs(story?.published_at).format("LL")}
                            </p>
                        </>
                    )}
                    <NextLink href="/about-us">
                        <a>About</a>
                    </NextLink>
                </div>
                {github && <AtomsCode content={github} error={githubError} />}
                {storyblok && (
                    <AtomsCode content={story} error={storyblokError} />
                )}
                <StoryblokComponentUtility blok={story.content} />
            </div>
        </>
    );
}

PageIndex.getLayout = function getLayout(page) {
    return <LayoutTemplateDefault>{page}</LayoutTemplateDefault>;
};

export async function getServerSideProps({ preview = false }) {
    const github = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/github");

    const githubData = await github.json();

    let storyblokURL;

    if (preview) {
        storyblokURL = "/api/storyblok/home?version=draft";
    } else {
        storyblokURL = "/api/storyblok/home?version=published";
    }

    const storyblok = await fetch(
        process.env.NEXT_PUBLIC_APP_URL + storyblokURL
    );

    const storyblokData = await storyblok.json();

    console.log("server preview", preview);

    try {
        return {
            props: {
                preview,
                fallback: {
                    github: githubData,
                    storyblok: storyblokData,
                },
            },
        };
    } catch (err) {
        // TODO (Change to 500 error page? or Better.)
        return {
            notFound: true,
        };
    }
}
