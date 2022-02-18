import AtomsCode from "./index.js";

export default {
    title: "components/atoms/code",
    component: AtomsCode,
    argTypes: {},
};

const Template = (args) => <AtomsCode {...args} />;

export const Default = Template.bind({});

const data = {
    id: "R_kgDOG2nScw",
    name: "next-storyblok",
};

Default.args = {
    content: data,
};
