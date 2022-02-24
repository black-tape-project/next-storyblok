/*

* Storyblok Template Page
- version (0.0.1)

"components/storyblok/templates/page/index.js"

*/

import StoryblokComponentUtility from "../../utilities";

const Editable = (blok) => {
    if (!("_editable" in blok) || blok._editable == null) {
        return {};
    }

    const options = JSON.parse(
        blok._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, "")
    );

    return {
        "data-blok-c": JSON.stringify(options),
        "data-blok-uid": options.id + "-" + options.uid,
    };
};

export default function StoryblokTemplatesIndex({ blok }) {
    return (
        <div {...Editable(blok)}>
            {blok.body
                ? blok.body.map((blok) => (
                      <StoryblokComponentUtility blok={blok} key={blok._uid} />
                  ))
                : null}
        </div>
    );
}
