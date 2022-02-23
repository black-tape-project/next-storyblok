const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
            <loc>url</loc>
            <lastmod>lastupdate</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
            </url>
        </urlset>
    `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
