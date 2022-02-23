/*

* Storyblok utilities Placeholder
- version (0.0.1)

"components/storyblok/utilities/placeholder/index.js"

*/

export default function StoryblokUtilityPlaceholder({ blok }) {
    return (
        <div className="border border-dashed border-red-700 bg-red-100 p-4 text-center text-red-700">
            <p className="mb-0 text-sm uppercase">
                The component <span className="font-bold">{blok}</span> has not
                been created yet.
            </p>
        </div>
    );
}
