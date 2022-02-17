import NextLink from "next/link";

import { githubConnection } from "../utilities/github";
import { storyblokConnection } from "../utilities/storyblok";

import { REPO_QUERY } from "../graphql/github/repo";
import { HOME_QUERY } from "../graphql/storyblok/home";

export default function PageAbout({ github, storyblok }) {
    return (
        <div className="container">
            <div className="my-4 text-center">
                <div>about</div>
                <NextLink href="/">
                    <a>Home</a>
                </NextLink>
            </div>
            <div className="mb-4 shadow-2xl">
                <div className="flex py-3 px-4 bg-gray-900 rounded-t-lg">
                    <div className="mr-2 w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="mr-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <code className="block overflow-scroll p-4 max-h-80 text-base text-white bg-gray-800 rounded-b-lg">
                    <pre>{JSON.stringify(github, null, 2)}</pre>
                </code>
            </div>
            <div className="mb-4 shadow-2xl">
                <div className="flex py-3 px-4 bg-gray-900 rounded-t-lg">
                    <div className="mr-2 w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="mr-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <code className="block overflow-scroll p-4 max-h-80 text-base text-white bg-gray-800 rounded-b-lg">
                    <pre>{JSON.stringify(storyblok, null, 2)}</pre>
                </code>
            </div>
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
