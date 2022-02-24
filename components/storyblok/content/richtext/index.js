/*

* Storyblok Content Richtext Atom
- version (0.0.1)

"components/storyblok/contentrichtext/index.js"

*/

import { sbEditable } from "@storyblok/storyblok-editable";

import { render } from "storyblok-rich-text-react-renderer";

export default function StoryblokContentRichtext({ blok }) {
    return (
        <div {...sbEditable(blok)}>
            <div className="content">
                <div className="last:mb-0" data-cy="richtext">
                    {render(blok.content)}
                </div>
            </div>
        </div>
    );
}
