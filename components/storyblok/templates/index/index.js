/*

* Storyblok Template Page
- version (0.0.1)

"components/storyblok/templates/page/index.js"

*/

import SbEditable from "storyblok-react";

import StoryblokComponentUtility from "../../utilities";

export default function StoryblokTemplatesIndex({ blok }) {
    return (
        <SbEditable content={blok}>
            {blok.body
                ? blok.body.map((blok) => (
                      <StoryblokComponentUtility blok={blok} key={blok._uid} />
                  ))
                : null}
        </SbEditable>
    );
}
