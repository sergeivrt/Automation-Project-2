import IssueModal from "../../pages/IssueModal";

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.contains(issueTitle).click();
      });
  });

  const issueTitle = "This is an issue of type: Task.";

  it("Should delete issue successfully", () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(issueTitle, false);
  });

  it("Should cancel deletion process successfully", () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    cy.get('[data-testid="modal:confirmation-dialog"]').should("not.exist");
    IssueModal.closeDetailModal();
    IssueModal.validateIssueVisibilityState(issueTitle, true);
  });
});
