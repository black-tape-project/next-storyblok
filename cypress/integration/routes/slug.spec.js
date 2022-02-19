import data from "../../fixtures/routes/slug.json";

function setUp() {
    cy.viewport("macbook-13");
    cy.visit("/");
}

describe("Slug", () => {
    it("Can access page", () => {
        setUp();

        cy.get('a[href*="about-us"]').click();

        cy.url().should("include", data.about.slug);
    });

    it("Has correct title", () => {
        setUp();

        cy.get('a[href*="about-us"]').click();

        cy.url().should("include", data.about.slug);

        cy.get("[data-cy=title]").contains(data.about.name);
    });
});
