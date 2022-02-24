import NextHead from "next/head";
import NextLink from "next/link";

import { NextSeo } from "next-seo";

import useSWR from "swr";

import dayjs from "dayjs";

import { useStoryblok } from "../utilities/api/storyblok";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import StoryblokComponentUtility from "../components/storyblok/utilities";

import { generateCanonicalUrl } from "../functions/url";

export default function PageAbout({ preview, fallback, variables }) {
    const enableBridge = preview;

    const { data: storyblok, error: storyblokError } = useSWR(
        "/api/storyblok/slug/" + variables.slug,
        { fallbackData: fallback.storyblok }
    );

    let story = useStoryblok(storyblok, enableBridge);

    console.log("preview", preview);

    return (
        <>
            <NextHead>
                <link
                    rel="preload"
                    href={
                        process.env.NEXT_PUBLIC_APP_URL +
                        "/api/storyblok/slug/" +
                        variables.slug
                    }
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

            <div className="container">
                <div className="my-4 text-center">
                    {storyblok && (
                        <>
                            <h1 data-cy="title" className="lowercase">
                                {story?.name}
                            </h1>
                            <p className="text-xs uppercase">
                                Last Updated{" "}
                                {dayjs(story?.published_at).format("LL")}
                            </p>
                        </>
                    )}
                    <NextLink href="/">
                        <a>Home</a>
                    </NextLink>
                </div>
                {variables && <AtomsCode content={variables} />}
                {storyblok && <AtomsCode content={story} />}
                <StoryblokComponentUtility blok={story.content} />
            </div>
        </>
    );
}

PageAbout.getLayout = function getLayout(page) {
    return <LayoutTemplateDefault>{page}</LayoutTemplateDefault>;
};

export async function getServerSideProps({ preview = false, params }) {
    const paramSlug = params.slug;

    const variables = {
        slug: paramSlug,
    };

    const storyblok = await fetch(
        process.env.NEXT_PUBLIC_APP_URL +
            "/api/storyblok/slug/" +
            variables.slug
    );

    const storyblokData = await storyblok.json();

    console.log("preview false", preview);

    if (preview) {
        console.log("preview true", preview);
    }

    try {
        return {
            props: {
                preview,
                variables,
                fallback: {
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
