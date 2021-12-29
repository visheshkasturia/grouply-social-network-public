describe('Player submmits the info then logs in', () => {

  it(('LOGS IN correctly'), () => {
    cy.visit('http://localhost:5000/');
    cy.get('#input-email-login').type('test@example.com');
    cy.get('#input-password-login').type('pass@123');
    cy.get('#login-confirm').click();
    cy.wait(500);
    cy.contains('@test11').should('exist');
  });
});



