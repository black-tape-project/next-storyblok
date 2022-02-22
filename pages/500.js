import NextLink from "next/link";

export default function Page500() {
    return (
        <>
            <h1>Static 500 - Server-side error occurred</h1>
            <NextLink href="/">
                <a className="bg-blue-100 p-2">Go Home</a>
            </NextLink>
        </>
    );
}
