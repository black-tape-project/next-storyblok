import { useEffect } from "react";

import NextRouter from "next/router";

import NProgress from "nprogress";

import "../styles/index.css";

function NextApp({ Component, pageProps }) {
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

    return getLayout(<Component {...pageProps} />);
}

export default NextApp;
