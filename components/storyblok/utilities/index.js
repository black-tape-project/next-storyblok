/*

* Storyblok utilities
- version (0.0.1)

"components/storyblok/utilities/index.js"

*/

import StoryblokUtilityPlaceholder from "./placeholder";

import StoryblokTemplatesIndex from "../templates/index";
import StoryblokTemplatesDefault from "../templates/default";

import StoryblokContentRichtext from "../content/richtext";

const Components = {
    template_index: StoryblokTemplatesIndex,
    template_default: StoryblokTemplatesDefault,
    richtext: StoryblokContentRichtext,
};

export default function StoryblokComponentUtility({ blok }) {
    if (typeof Components[blok.component] !== "undefined") {
        const Component = Components[blok.component];

        return <Component blok={blok} key={blok._uid} />;
    }

    return <StoryblokUtilityPlaceholder blok={blok.component} />;
}
