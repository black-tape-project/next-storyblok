import { useEffect } from "react";

import NextHead from "next/head";
import NextRouter from "next/router";

import { DefaultSeo } from "next-seo";

import NProgress from "nprogress";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "../styles/index.css";

function NextApp({ Component, pageProps }) {
    dayjs.extend(localizedFormat);

    useEffect(() => {
        const load = () => {
            NProgress.start();
        };

        const stop = () => {
            NProgress.done();
        };

        NextRouter.events.on("routeChangeStart", () => load());
        NextRouter.events.on("routeChangeComplete", () => stop());
        NextRouter.events.on("routeChangeError", () => stop());
    });

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <NextHead>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {/* The above meta tags *must* come first in the <head>
                to consistently ensure proper document rendering.
                Any other head element should come *after* these tags. */}
            </NextHead>

            <DefaultSeo
                title="next-storyblok"
                description="Starter Kit"
                openGraph={{
                    type: "website",
                    site_name: "next-storyblok",
                }}
            />

            {getLayout(<Component {...pageProps} />)}
        </>
    );
}

export default NextApp;
