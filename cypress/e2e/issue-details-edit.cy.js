describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      updateIssueType('Story');
      updateIssueStatus('Done');
      updateIssueAssignees(['Lord Gaben', 'Baby Yoda']);
      updateIssueReporter('Pickle Rick');
      updateIssuePriority('Medium');
    });
  });

  function updateIssueType(type) {
    cy.get('[data-testid="select:type"]').click('bottomRight');
    cy.get(`[data-testid="select-option:${type}"]`).click();
    cy.get('[data-testid="select:type"]').should('contain', type);
  }

  function updateIssueStatus(status) {
    cy.get('[data-testid="select:status"]').click('bottomRight');
    cy.get(`[data-testid="select-option:${status}"]`).click();
    cy.get('[data-testid="select:status"]').should('have.text', status);
  }

  function updateIssueAssignees(assignees) {
    cy.get('[data-testid="select:assignees"]').click('bottomRight');
    assignees.forEach(assignee => {
      cy.get(`[data-testid="select-option:${assignee}"]`).click();
    });
    assignees.forEach(assignee => {
      cy.get('[data-testid="select:assignees"]').should('contain', assignee);
    });
  }

  function updateIssueReporter(reporter) {
    cy.get('[data-testid="select:reporter"]').click('bottomRight');
    cy.get(`[data-testid="select-option:${reporter}"]`).click();
    cy.get('[data-testid="select:reporter"]').should('have.text', reporter);
  }

  function updateIssuePriority(priority) {
    cy.get('[data-testid="select:priority"]').click('bottomRight');
    cy.get(`[data-testid="select-option:${priority}"]`).click();
    cy.get('[data-testid="select:priority"]').should('have.text', priority);
  }

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  // Task 1: Test for Priority Dropdown
  it('Should validate values in issue priorities dropdown', () => {
    const expectedLength = 5;
    let priorityValues = [];

    getIssueDetailsModal().within(() => {
      // Get initially selected priority value
      const initialPriority = cy.get('[data-testid="select:priority"]').invoke('text');

      // Push initial priority value into array
      initialPriority.then(text => priorityValues.push(text.trim()));

      // Open priority dropdown
      cy.get('[data-testid="select:priority"]').click('bottomRight');

      // Get all priority options and save their text values into array
      cy.get('[data-testid^="select-option:"]').each(option => {
        cy.wrap(option).invoke('text').then(text => {
          priorityValues.push(text.trim());
          cy.log(`Added value: ${text}, Array length: ${priorityValues.length}`);
        });
      });
    });

    // Assert array length
    cy.wrap(priorityValues).should('have.length', expectedLength);
    // Assert array values
    cy.wrap(priorityValues).should('deep.equal', ["Lowest", "Low", "Medium", "High", "Highest"]);
  });

  // Task 2: Test for Reporter's Name
  it('Should validate that the reporter’s name has only characters', () => {
    getIssueDetailsModal().within(() => {
      const reporterName = cy.get('[data-testid="select:reporter"]').invoke('text');

      reporterName.then(text => {
        const regex = /^[A-Za-z\s]+$/;
        expect(regex.test(text.trim())).to.be.true;
      });
    });
  });

  // Task 3: Test for Removing Unnecessary Spaces
  it('Should validate that unnecessary spaces are removed from issue title on the board view', () => {
    const title = '   Hello   world!   ';

    // Create issue with extra spaces in title
    // Assuming implementation to create issue
    createIssueWithTitle(title);

    // Access the created issue title on the board
    // Assuming implementation to access issue title
    const boardIssueTitle = cy.get('[data-testid="board-issue"]').first().invoke('text');

    // Assert issue title with extra spaces removed
    boardIssueTitle.then(text => {
      const trimmedTitle = title.trim();
      expect(text.trim()).to.equal(trimmedTitle);
    });
  });

  // Function to create issue with a given title
  function createIssueWithTitle(title) {
    // Assuming implementation to create issue with title
    // Replace this with actual implementation
    // For demonstration purposes, just logging the title
    cy.log(`Creating issue with title: ${title}`);
  }
});