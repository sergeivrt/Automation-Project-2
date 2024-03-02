/// Assignment 6
// e2e/issue-time-tracking.cy.js

describe('Time Tracking Functionality', () => {
    const TIME_ESTIMATION_FIELD = '[data-testid="original-estimate"]';
    const TIME_TRACKING_SECTION = '[data-testid="time-tracking-section"]';
    const TIME_LOGGING_DIALOG = '[data-testid="time-logging-dialog"]';
    const TIME_SPENT_FIELD = '[data-testid="time-spent"]';
    const TIME_REMAINING_FIELD = '[data-testid="time-remaining"]';
    const DONE_BUTTON = 'button:contains("Done")';

    beforeEach(() => {
        cy.visit('/');
        // Add your logic to navigate to the issue detail view
    });

    // Time Estimation Functionality
    it('Time Estimation Functionality', () => {
        const originalEstimate = '10';
        const updatedEstimate = '20';

        // Adding estimation
        cy.get(TIME_ESTIMATION_FIELD).type(originalEstimate);

        // Asserting that the estimation is added and visible
        cy.contains(TIME_TRACKING_SECTION, `Original Estimate: ${originalEstimate} hours`);

        // Editing the estimation
        cy.get(TIME_ESTIMATION_FIELD).clear().type(updatedEstimate);

        // Asserting that the updated value is visible
        cy.contains(TIME_TRACKING_SECTION, `Original Estimate: ${updatedEstimate} hours`);

        // Removing the estimation
        cy.get(TIME_ESTIMATION_FIELD).clear();

        // Asserting that the value is removed
        cy.get(TIME_TRACKING_SECTION).should('not.contain', 'Original Estimate:');
    });

    // Time Logging Functionality
    it('Time Logging Functionality', () => {
        const timeSpent = '2';
        const timeRemaining = '5';

        // Log time
        cy.get(TIME_TRACKING_SECTION).click();
        cy.get(TIME_LOGGING_DIALOG).within(() => {
            cy.get(TIME_SPENT_FIELD).type(timeSpent);
            cy.get(TIME_REMAINING_FIELD).type(timeRemaining);
            cy.contains(DONE_BUTTON).click();
        });

        // Assert that time is logged
        cy.get(TIME_TRACKING_SECTION).should('contain', `Spent Time: ${timeSpent} hours`);

        // Remove logged time
        cy.get(TIME_TRACKING_SECTION).click();
        cy.get(TIME_LOGGING_DIALOG).within(() => {
            cy.get(TIME_SPENT_FIELD).clear();
            cy.get(TIME_REMAINING_FIELD).clear();
            cy.contains(DONE_BUTTON).click();
        });

        // Assert that logged time is removed
        cy.get(TIME_TRACKING_SECTION).should('contain', 'Original Estimate:');
    });
});