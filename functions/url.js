/*

* Home
- version (0.0.1)

"pages/index.js"

*/

export const generateCanonicalUrl = (slug) => {
    const base = "http://localhost:3000";

    if (slug === "home") {
        return base;
    } else if (slug === "/") {
        return base;
    } else {
        return base + "/" + slug;
    }
};
