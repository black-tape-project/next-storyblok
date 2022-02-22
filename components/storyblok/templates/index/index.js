/*

* Storyblok Template Page
- version (0.0.1)

"components/storyblok/templates/page/index.js"

*/

// import StoryblokEditable from "storyblok-react";

import StoryblokComponentUtility from "../../utilities";

export default function StoryblokTemplatesIndex({ blok }) {
    return (
        <>
            {/* <StoryblokEditable content={blok}> */}
            {blok.body
                ? blok.body.map((blok) => (
                      <StoryblokComponentUtility blok={blok} key={blok._uid} />
                  ))
                : null}
            {/* </StoryblokEditable> */}
        </>
    );
}
