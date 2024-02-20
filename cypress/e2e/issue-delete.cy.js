describe("Issue Deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it.only("Should delete an issue", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').click();
      cy.reload();
      cy.contains("This is an issue of type: Task.").should('not.exist');
    });
  });
});
