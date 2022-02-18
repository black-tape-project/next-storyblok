import NextLink from "next/link";

import { githubConnection } from "../utilities/github";
import { storyblokConnection } from "../utilities/storyblok";

import { REPO_QUERY } from "../graphql/github/repo";
import { HOME_QUERY } from "../graphql/storyblok/home";

import AtomsCode from "../components/atoms/code";

export default function PageIndex({ github, storyblok }) {
    return (
        <div className="container">
            <div className="my-4 text-center">
                <h1>{process.env.NEXT_PUBLIC_SCHEMA_SITE_NAME}</h1>
                <p className="intro">Intro</p>
                <NextLink href="/about-us">
                    <a>About</a>
                </NextLink>
            </div>
            <AtomsCode content={github} />
            <AtomsCode content={storyblok} />
        </div>
    );
}

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
