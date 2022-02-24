/*

* Storyblok Content Richtext Atom
- version (0.0.1)

"components/storyblok/contentrichtext/index.js"

*/

import { render } from "storyblok-rich-text-react-renderer";

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

export default function StoryblokContentRichtext({ blok }) {
    return (
        <div {...Editable(blok)}>
            <div className="content">
                <div className="last:mb-0" data-cy="richtext">
                    {render(blok.content)}
                </div>
            </div>
        </div>
    );
}
