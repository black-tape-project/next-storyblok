module.exports = {
    staticDirs: ["../public"],
    stories: ["./stories/**/*.stories.{js,jsx}"],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
        "storybook-addon-storyout/register",
    ],
    framework: "@storybook/react",
    core: {
        builder: "webpack5",
    },
};
