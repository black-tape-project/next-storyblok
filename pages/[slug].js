import NextHead from "next/head";
import NextLink from "next/link";

import { NextSeo } from "next-seo";

import useSWR from "swr";

import dayjs from "dayjs";

import AtomsCode from "../components/atoms/code";

import LayoutTemplateDefault from "../components/templates/default";

import StoryblokComponentUtility from "../components/storyblok/utilities";

import { generateCanonicalUrl } from "../functions/url";

export default function PageAbout({ variables, fallback }) {
    const { data: storyblok, error: storyblokError } = useSWR(
        "/api/storyblok/slug/" + variables.slug,
        { fallbackData: fallback.storyblok }
    );

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

            <div className="container">
                <div className="my-4 text-center">
                    {storyblok && (
                        <>
                            <h1 data-cy="title" className="lowercase">
                                {storyblok?.name}
                            </h1>
                            <p className="text-xs uppercase">
                                Last Updated{" "}
                                {dayjs(storyblok?.published_at).format("LL")}
                            </p>
                        </>
                    )}
                    <NextLink href="/">
                        <a>Home</a>
                    </NextLink>
                </div>
                {variables && <AtomsCode content={variables} />}
                {storyblok && <AtomsCode content={storyblok} />}
                <StoryblokComponentUtility blok={storyblok.content} />
            </div>
        </>
    );
}

PageAbout.getLayout = function getLayout(Page) {
    return <LayoutTemplateDefault>{Page}</LayoutTemplateDefault>;
};

export async function getServerSideProps({ params }) {
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

    try {
        return {
            props: {
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
