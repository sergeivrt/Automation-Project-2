import IssueModal from '../pages/IssueModal';

describe('Issue Deletion', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should delete an issue', () => {
    IssueModal.getIssueDetailModal().should('be.visible');
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    IssueModal.validateIssueVisibilityState('Title of the issue', false);
  });
});
