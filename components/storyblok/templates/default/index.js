/*

* Storyblok Template Page
- version (0.0.1)

"components/storyblok/templates/page/index.js"

*/

import { sbEditable } from "@storyblok/storyblok-editable";

import StoryblokComponentUtility from "../../utilities";

export default function StoryblokTemplatesDefault({ blok }) {
    return (
        <div {...sbEditable(blok)}>
            {blok.body
                ? blok.body.map((blok) => (
                      <StoryblokComponentUtility blok={blok} key={blok._uid} />
                  ))
                : null}
        </div>
    );
}
