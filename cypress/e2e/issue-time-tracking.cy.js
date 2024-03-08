/// ASSIGNMENT 6
import { es, faker } from "@faker-js/faker";

describe("Time tracking", () => {
  const issueTitle = faker.lorem.words(4);
  const initialEstimatedTime = 10;
  const updatedEstimatedTime = 20;
  const loggedTimeSpent = 2;
  const loggedTimeRemaining = 5;

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create issue and manipulate time estimation", () => {
    createIssue(issueTitle);
    cy.reload();
    cy.contains(issueTitle).click();
    manipulateTimeEstimation(initialEstimatedTime, updatedEstimatedTime);
    manipulateTimeEstimation(updatedEstimatedTime, null);
    manipulateTimeEstimation(null, null);
  });

  it("Should create issue, add time estimation, and log/remove logged spent time on issue", () => {
    createIssue(issueTitle);
    cy.reload();
    cy.contains(issueTitle).click();
    addTimeEstimationAndLog(
      loggedTimeSpent,
      loggedTimeRemaining,
      initialEstimatedTime
    );
    clearTimeEstimationAndLog(initialEstimatedTime);
  });

  const createIssue = (title) => {
    cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).within(
      () => {
        cy.get('input[name="title"]').type(title);
        cy.get('button[type="submit"]').click();
      }
    );
  };

  const manipulateTimeEstimation = (initialValue, clearValue) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]').click();
      if (initialValue !== null) {
        cy.get('[placeholder="Number"]').clear().type(initialValue);
      }
      if (clearValue !== null) {
        cy.get('[placeholder="Number"]').clear();
      }
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const addTimeEstimationAndLog = (timeSpent, timeRemaining, initialValue) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.get('[placeholder="Number"]').type(initialValue);
    });

    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('[placeholder="Number"]').eq(0).type(timeSpent);
      cy.get('[placeholder="Number"]').eq(1).type(timeRemaining);
      cy.get("button").contains("Done").click();
    });
  };
  const clearTimeEstimationAndLog = (initialValue) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]').click();
      cy.get('[placeholder="Number"]').clear();
    });

    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('[placeholder="Number"]').clear();
      cy.contains("No time logged").should("be.visible");
      cy.contains(initialValue + "h estimated").should("be.visible");
      cy.get("button").contains("Done").click();
    });
  };
});
