import NextLink from "next/link";

import LayoutTemplateDefault from "../components/templates/default";

function PageError({ statusCode }) {
    return (
        <>
            <div className="container">
                <div className="my-4 text-center">
                    <h1 data-cy="title" className="lowercase">
                        {statusCode}
                    </h1>
                    <p className="intro">
                        {statusCode
                            ? `An error ${statusCode} occurred on server`
                            : "An error occurred on client"}
                    </p>
                    <NextLink href="/about-us">
                        <a>About</a>
                    </NextLink>
                </div>
            </div>
        </>
    );
}

PageError.getLayout = function getLayout(page) {
    return <LayoutTemplateDefault>{page}</LayoutTemplateDefault>;
};

PageError.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    return { statusCode };
};

export default PageError;
