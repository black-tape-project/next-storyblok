module.exports = {
    staticDirs: ["../public"],
    stories: ["../components/**/*.stories.{js,jsx}"],
    addons: [
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
        "@storybook/addon-a11y",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "storybook-addon-storyout/register",
    ],
    framework: "@storybook/react",
    core: {
        builder: "webpack5",
    },
};
