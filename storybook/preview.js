import ReactDOMServer from "react-dom/server";

import { addParameters, addDecorator } from "@storybook/react";

import { withSource, custom } from "storybook-addon-storyout";

import "../styles/index.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

const render = custom({
    stringify: (node) => ReactDOMServer.renderToStaticMarkup(node),
});

addParameters({
    source: {
        render,
    },
});

addDecorator(withSource);
