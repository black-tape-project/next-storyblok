import NextLink from "next/link";

// import LayoutTemplateDefault from "../components/templates/default";

export default function Page404() {
    return (
        <>
            <h1>Static 404 - Page Not Found</h1>
            <NextLink href="/">
                <a className="bg-blue-100 px-2">Go Home</a>
            </NextLink>
        </>
    );
}

// TODO (Doesn't seem to work?)
// Page404.getLayout = function getLayout(Page) {
//     return <LayoutTemplateDefault>{Page}</LayoutTemplateDefault>;
// };
