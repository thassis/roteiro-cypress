describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]').type('Estudar matemática hoje{enter}');
    cy.get('[data-cy=todo-input]').type('Estudar ES hoje{enter}');

    cy.get('[data-cy=todos-list] li:first .toggle').click();

    cy.contains('button', 'Clear completed').click();

    cy.get('[data-cy=todos-list]')
      .should('not.contain', 'Estudar matemática hoje');

    cy.get('[data-cy=todos-list]')
      .should('contain', 'Estudar ES hoje');
  });

  it('Editar uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy="todo-input"]').type('Estudar prova de SO{enter}');

    cy.get('[data-cy="todos-list"] li')
      .dblclick();

    cy.get('[data-cy="todos-list"] li.editing .edit')
      .clear()
      .type('Fazer TP de SO{enter}');

    cy.get('[data-cy="todos-list"]')
      .should('contain', 'Fazer TP de SO')
      .and('not.contain', 'Estudar prova de SO');
  });

  it('Mostrar quantidade de tarefas restantes', () => {
    cy.visit('');

    cy.get('[data-cy="todo-input"]').type('Estudar Cypress{enter}');
    cy.get('[data-cy="todo-input"]').type('Fazer exercícios{enter}');
    cy.get('[data-cy="todo-input"]').type('Ler um livro{enter}');

    cy.get('.todo-count').should('contain', '3 items left');

    cy.get('[data-cy="todos-list"] li:first .toggle').click();

    cy.get('.todo-count').should('contain', '2 items left');

    cy.get('[data-cy="todos-list"] li:nth-child(2) .toggle').click();

    cy.get('.todo-count').should('contain', '1 item left');
  });
});