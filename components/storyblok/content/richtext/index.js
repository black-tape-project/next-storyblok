/*

* Storyblok Content Richtext Atom
- version (0.0.1)

"components/storyblok/contentrichtext/index.js"

*/

import SbEditable from "storyblok-react";

import { render } from "storyblok-rich-text-react-renderer";

export default function StoryblokContentRichtext({ blok }) {
    return (
        <SbEditable content={blok}>
            <div className="content">
                <div className="last:mb-0" data-cy="richtext">
                    {render(blok.content)}
                </div>
            </div>
        </SbEditable>
    );
}
