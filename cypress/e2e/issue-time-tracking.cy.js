/// ASSIGNMENT 6
/// ASSIGNMENT 6
import { es, faker } from "@faker-js/faker";

describe("Time tracking - Add estimation, Update estimation, Remove estimation, Log time, Remove logged time ", () => {
  const issueTitle = faker.lorem.words(4);
  const initialEstimationValue = 10;
  const updatedEstimationValue = 20;
  const timeSpent = 2;
  const timeRemaining = 5;
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
        cy.wait(5000);
      });
  });

  it("TC1-TC3:User adds, updates, and removes estimation Time to the issue", () => {
    createIssue(issueTitle);
    cy.wait(20000);
    cy.contains(issueTitle).click();
    addEstimation(initialEstimationValue);
    cy.wait(5000);
    verifyInitialEstimationSaved(initialEstimationValue);
    cy.contains(issueTitle).click();
    updateEstimation(updatedEstimationValue);
    cy.wait(5000);
    verifyUpdatedEstimationSaved(updatedEstimationValue);
    cy.contains(issueTitle).click();
    removeEstimation();
    cy.wait(5000);
    verifyNoEstimation();
  });

  it("TC4-TC5:User logs spent and remaining time and then removes logs to recently created issue", () => {
    createIssue(issueTitle);
    cy.wait(20000);
    cy.contains(issueTitle).click();
    logTime(timeSpent, timeRemaining);
    verifyTimeLogged(timeSpent, timeRemaining);
    removeLoggedTime();
    verifyLoggedTimeRemoved();
  });
  
  // Helper functions

  const createIssue = (title) => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.wait(1000);
      cy.get('input[name="title"]').type(title);
      cy.get('button[type="submit"]').click();
    });
  };

  const addEstimation = (initialEstimationValue) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').type(initialEstimationValue);
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const verifyInitialEstimationSaved = (initialEstimationValue) => {
    cy.contains(issueTitle).click();
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').should(
        "have.value",
        initialEstimationValue
      );
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const updateEstimation = (updatedEstimationValue) => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').clear().type(updatedEstimationValue);
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const verifyUpdatedEstimationSaved = (updatedEstimationValue) => {
    cy.contains(issueTitle).click();
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').should(
        "have.value",
        updatedEstimationValue
      );
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const removeEstimation = () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').clear();
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const verifyNoEstimation = () => {
    cy.contains(issueTitle).click();
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[placeholder="Number"]').should("have.value", "");
      cy.get('[data-testid="icon:close"]').click();
    });
  };

  const logTime = (timeSpent, timeRemaining) => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]')
      .should("be.visible")
      .within(() => {
        cy.wait(1000);
        cy.get('[placeholder="Number"]').eq(0).click().type(timeSpent);
        cy.get('[placeholder="Number"]').eq(1).click().type(timeRemaining);
        cy.contains("button", "Done").click();
        cy.wait(5000);
      });
  };

  const verifyTimeLogged = (timeSpent, timeRemaining) => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]')
    .should("be.visible")
    .within(() => {
      cy.wait(1000);
    cy.contains(timeSpent + "h logged").should("be.visible");
    cy.contains(timeRemaining + "h remaining").should("be.visible");
    cy.contains("button", "Done").click();
        cy.wait(5000);
      });
  };

  const removeLoggedTime = () => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]')
    .should("be.visible")
    .within(() => {
      cy.wait(1000);
    cy.get('[placeholder="Number"]').eq(0).click().clear();
    cy.get('[placeholder="Number"]').eq(1).click().clear();
    cy.contains("button", "Done").click();
        cy.wait(5000);
      });
  };

  const verifyLoggedTimeRemoved = () => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]')
    .should("be.visible")
    .within(() => {
      cy.wait(1000);
    cy.contains("No time logged").should("be.visible");
    cy.contains("button", "Done").click();
    cy.wait(5000);
  });
  };
});
