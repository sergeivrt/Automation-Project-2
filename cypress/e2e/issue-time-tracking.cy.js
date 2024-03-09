/// ASSIGNMENT 6
/// ASSIGNMENT 6
import { es, faker } from "@faker-js/faker";

describe("Time tracking - Add estimation", () => {
  const issueTitle = faker.lorem.words(4);
  const initialEstimation = 10;
  const updatedEstimation = 20;

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("User can add estimation to issue", () => {
    createIssue(issueTitle);
    cy.wait(7000)
    cy.contains(issueTitle).click();
    addEstimation(initialEstimation);
    cy.wait(7000)
    cy.reload();
    verifyEstimationSaved(initialEstimation);
  });

  // Helper functions

  const createIssue = (title) => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.wait(1000)
      cy.get('input[name="title"]').type(title);
      cy.get('button[type="submit"]').click();
    });
  };

  const addEstimation = (initialEstimation) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').type(initialEstimation);
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const verifyEstimationSaved = (initialEstimation) => {
    cy.contains(issueTitle).click();
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').should("have.value", initialEstimation);
      cy.get('[data-testid="icon:close"]').click();
    });
  };
});