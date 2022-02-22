/*

* Storyblok Content Richtext Atom
- version (0.0.1)

"components/storyblok/contentrichtext/index.js"

*/

// import StoryblokEditable from "storyblok-react";

import { render } from "storyblok-rich-text-react-renderer";

export default function StoryblokContentRichtext({ blok }) {
    return (
        // <StoryblokEditable content={blok} key={blok._uid}>
        <div className="content">
            <div className="last:mb-0" data-cy="richtext">
                {render(blok.content)}
            </div>
        </div>
        // </StoryblokEditable>
    );
}
