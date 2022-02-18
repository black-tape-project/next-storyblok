import NextLink from "next/link";

export default function Page404() {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <NextLink href="/">
                <a className="bg-blue-100 px-2">Go Home</a>
            </NextLink>
        </>
    );
}
