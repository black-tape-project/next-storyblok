import { expect } from "@storybook/jest";
import { within, waitFor } from "@storybook/testing-library";

import AtomsCode from "../../../../components/atoms/code";

const json = {
    id: "R_kgDOG2nScw",
    name: "next-storyblok",
};

export default {
    title: "components/atoms/code",
    component: AtomsCode,
    argTypes: {},
    parameters: { controls: { sort: "requiredFirst" } },
};

const Template = (args) => <AtomsCode {...args} />;

export const Default = Template.bind({});

Default.args = {
    content: json,
};

Default.play = async ({ canvasElement }) => {
    // Test 1 - Pass
    const canvas = within(canvasElement);
    const component = canvas.getByTestId("code");
    await waitFor(() => expect(component).toBeTruthy());

    // Test 2 - Fail
    const canvas2 = within(canvasElement);
    const component2 = canvas2.getByTestId("code");
    await waitFor(() => expect(component2).toBeFalsy());
};
