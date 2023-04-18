import DOM from '../../src/constants/dom';

describe('Create Todo', () => {
  it('user open and create task', () => {
    cy.visit('http://localhost:4173/');
    cy.get(`#${DOM.Button.CREATE_TASK}`)
      .should('exist')
      .should('contain.text', '+ Create Task')
      .click();
  });
});
