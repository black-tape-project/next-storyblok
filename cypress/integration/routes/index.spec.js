function setUp() {
    cy.viewport("macbook-13");
    cy.visit("http://localhost:3000");
}

describe("Homepage", () => {
    it("Can access homepage", () => {
        setUp();
    });

    it("Has correct title", () => {
        setUp();
        cy.get("[data-cy=title]").contains("next-storyblok");
    });
});
