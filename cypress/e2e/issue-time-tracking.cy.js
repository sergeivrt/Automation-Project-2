/// ASSIGNMENT 6
/// ASSIGNMENT 6
import { es, faker } from "@faker-js/faker";

describe("Time tracking", () => {
  const issueTitle = faker.lorem.words(4);
  const initialEstimatedTime = 10;
  const updatedEstimatedTime = 20;
  const loggedTimeSpent = 2;
  const loggedTimeRemaining = 5;

  describe("Time tracking", () => {
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
      cy.contains(issueTitle).click();
      manipulateTimeEstimation(initialEstimatedTime, updatedEstimatedTime);
      manipulateTimeEstimation(updatedEstimatedTime, null);
      manipulateTimeEstimation(null, null);
    });

    it("Should create issue, add time estimation, and log/remove logged spent time on issue", () => {
      createIssue(issueTitle);
      cy.contains(issueTitle).click();
      addTimeEstimationAndLog(
        loggedTimeSpent,
        loggedTimeRemaining,
        initialEstimatedTime
      );
      clearTimeEstimationAndLog(initialEstimatedTime);
    });

    const createIssue = (title) => {
      cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.wait(3000);
        cy.get('input[name="title"]').type(title);
        cy.get('button[type="submit"]').click();
        cy.wait(20000);
      });
    };

    const manipulateTimeEstimation = (initialValue, clearValue) => {
      cy.get('[data-testid="modal:issue-details"]').within(() => {
        cy.wait(10000);
        cy.get('[data-testid="icon:stopwatch"]').click();
        if (initialValue !== null) {
          cy.get('[placeholder="Number"]').eq(0).clear({ force: true }).type(initialValue, { force: true });
        }
        if (clearValue !== null) {
          cy.get('[placeholder="Number"]').eq(0).clear({ force: true });
        }
        cy.get('[data-testid="icon:close"]').click({ force: true });
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
});
