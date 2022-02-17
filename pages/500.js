import NextLink from "next/link";

export default function Page500() {
    return (
        <>
            <h1>500 - Server-side error occurred</h1>
            <NextLink href="/">
                <a className="p-2 bg-blue-100">Go Home</a>
            </NextLink>
        </>
    );
}
