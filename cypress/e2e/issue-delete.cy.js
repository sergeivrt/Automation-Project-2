import IssueModal from "../pages/IssueModal";

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

  it("Should delete an issue", () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(
      "This is an issue of type: Task.",
      false
    );
  });

  it("Should delete an issue and cancel Confirmation", () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    cy.get('[data-testid="modal:confirmation-dialog"]').should("not.exist");
    IssueModal.closeDetailModal();
    IssueModal.validateIssueVisibilityState(
      "This is an issue of type: Task.",
      true
    );
  });
});
