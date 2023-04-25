import DOM from '../../src/constants/dom';

const SERVER_URL = 'http://localhost:4173/';

describe('Test Todo Page', () => {
  beforeEach(() => {
    cy.visit(SERVER_URL);
    cy.url().should('include', SERVER_URL);
    cy.intercept('/**/TaskPopup**').as('getTaskPopup');
  });

  const clickOnCreateTaskButton = () => {
    cy.get(`#${DOM.Button.CREATE_TASK}`)
      .as('btn')
      .should('exist')
      .should('contain.text', 'Create Task')
      .click();
  };

  const getTaskPopup = () => cy.get('[data-test-id="task-popup"]');

  const createTaskFormPopup = (todoTaskText) => {
    const popupTask = getTaskPopup();
    popupTask.should('exist').should('be.visible');
    popupTask
      .find('[data-id="inpTitle"]')
      .should('exist')
      .should('have.value', '')
      .type(todoTaskText);

    cy.get('[data-id="btnConfirm"]')
      .as('btn')
      .should('exist')
      .should('contain.text', 'Create')
      .click();
  };

  const getColumnChildren = () => {
    return cy.get('[data-test-id="task-column"]').should('exist').children();
  };

  const checkNumberOfTaskInColumnMatch = (numberOfTasks) => {
    getColumnChildren().should('have.length', numberOfTasks + 1);
  };

  it.only('user open main page and create task', () => {
    cy.get(`#${DOM.Popup.CONTAINER}`)
      .should('exist')
      .should('have.class', 'hidden');

    cy.get(`#${DOM.Popup.CONTAINER}`)
      .should('exist')
      .should('have.class', 'hidden')
      .find('.spinner')
      .should('exist');

    clickOnCreateTaskButton();

    const todoTaskText = 'Welcome Task';
    createTaskFormPopup(todoTaskText);
    checkNumberOfTaskInColumnMatch(1);

    getColumnChildren().first().should('contain.text', todoTaskText);
  });

  it.only('user create task and delete one', () => {
    const tasks = ['Welcome Task', 'Read books'];
    tasks.forEach((text, index) => {
      clickOnCreateTaskButton();
      if (index === 0) cy.wait('@getTaskPopup');
      createTaskFormPopup(text);
    });
    checkNumberOfTaskInColumnMatch(tasks.length);

    getColumnChildren()
      .first()
      .find('[data-btn="btnDelete"]')
      .should('exist')
      .click();

    const popupTask = getTaskPopup();
    popupTask
      .find('[data-id="btnConfirm"]')
      .should('exist')
      .should('contain.text', 'Delete')
      .click();

    tasks.pop();

    checkNumberOfTaskInColumnMatch(tasks.length);
    tasks.forEach((text) => {
      getColumnChildren().should('contain', text);
    });
  });
});
