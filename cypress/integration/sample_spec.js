// describe("My First Test", function() {
//   it("Visits the Kitchen Sink", function() {
//     cy.visit("https://example.cypress.io");
//     cy.contains("type").click();

//     // Should be on a new URL which includes '/commands/actions'
//     cy.url().should("include", "/commands/actions");

//     // Get an input, type into it and verify that the value has been updated
//     cy.get(".action-email")
//       .type("fake@email.com")
//       .should("have.value", "fake@email.com");
//   });
// });

// describe("Testing commdash", function() {
//   it("Visits the commdash page", function() {
//     cy.visit(
//       "https://aeonivv2.hosc.msfc.nasa.gov/AeonPortal/CommDash/CommDash.php"
//     );
//     cy.get("input[value='HOSC Credentials Login']").click();
//     cy.get("input[name='username']").type("padmin1");
//     cy.get("input[value='Login']").click();
//     cy.contains("Settings").click();
//   });
// });

describe("Testing brave", function() {
  it("Visits the brave page", function() {
    cy.visit("http://localhost:3000/");
    const cardClass = ".Table_grid_item";
    cy.get(cardClass)
      .eq(4)
      .click();
    cy.get(cardClass)
      .eq(3)
      .click();
    cy.get(cardClass)
      .eq(4)
      .find("img")
      .should("have.css", "borderColor", "rgb(0, 128, 0)");
    cy.get(cardClass)
      .eq(4)
      .click();
  });
});
