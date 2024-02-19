/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(issueTitle, false);
  });

  it.only('Should cancel deletion process successfully', () => {
    IssueModal.getIssueDetailModal().should("be.visible");
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    cy.get('[data-testid="modal:confirmation-dialog"]').should("not.exist");
    IssueModal.closeDetailModal();
    IssueModal.validateIssueVisibilityState(issueTitle, true);
  });
});