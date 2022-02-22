/*

* Home
- version (0.0.1)

"pages/index.js"

*/

export const generateCanonicalUrl = (slug) => {
    const base = process.env.NEXT_PUBLIC_APP_URL;

    if (slug === "home") {
        return base;
    } else if (slug === "/") {
        return base;
    } else {
        return base + "/" + slug;
    }
};
