describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });
});

///Assignment 1
describe("Assignment 1", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });
  const MyComment = "MY_Test_Comment";
  const MyEditedComment = "MY_Edited_Test_Comment";

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getCommentTextarea = () =>
    cy.get('textarea[placeholder="Add a comment..."]');
  const getAddCommentButton = () => cy.contains("button", "Save");
  const getEditCommentButton = () =>
    cy.get('[data-testid="issue-comment"]').first().contains("Edit");
  const getDeleteCommentButton = () =>
    cy.get('[data-testid="issue-comment"]').contains("Delete");
  const getCancelDeleteButton = () =>
    cy.get('[data-testid="modal:confirm"]').contains("button", "Cancel");

  it("Should add, edit, cancel delete, and delete a comment", () => {
    // Add a comment
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      getCommentTextarea().type(MyComment);
      getAddCommentButton().click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", MyComment);
    });

    // Edit the added comment
    getIssueDetailsModal().within(() => {
      getEditCommentButton().click().should("not.exist");
      getCommentTextarea()
        .should("contain", MyComment)
        .clear()
        .type(MyEditedComment);
      getAddCommentButton().click().should("not.exist");
      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", MyEditedComment);
    });

    // Cancel delete the comment
    getIssueDetailsModal().then(() => {
      getDeleteCommentButton().click();
      getCancelDeleteButton().click().should("not.exist");
    });
    getIssueDetailsModal().then(() => {
      cy.get('[data-testid="issue-comment"]').should(
        "contain",
        MyEditedComment
      );
    });

    // Delete the comment
    getIssueDetailsModal().then(() => {
      getDeleteCommentButton().click();
      cy.get('[data-testid="modal:confirm"]')
        .contains("button", "Delete comment")
        .click()
        .should("not.exist");
      getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .contains(MyEditedComment)
        .should("not.exist");
    });
  });
});
