import NextLink from "next/link";

export default function Page404() {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <NextLink href="/">
                <a className="p-2 bg-blue-100">Go Home</a>
            </NextLink>
        </>
    );
}
