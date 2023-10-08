describe('appointment', ()=> {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit('/');
    cy.contains('Monday').should('exist');
  });

  it('books an appointment', ()=> {
    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains('Save').click();
    cy.contains(".appointment__card--show",'Lydia Miller-Jones');
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it('edits an appointment', ()=> {
    cy.get('.appointment__card--show').trigger('mouseover');
    cy.get('[alt=Edit]').first().click({force: true});
    cy.get("[alt='Tori Malcolm']").click();
    cy.get('[data-testid=student-name-input]').clear().type("Bo Yang Yu");
    cy.contains('Save').click();
    cy.contains(".appointment__card--show",'Tori Malcolm');
    cy.contains(".appointment__card--show", "Bo Yang Yu");
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').first().click({force:true});
    cy.contains("Confirm").click();
    cy.contains("Deleting").should('exist');
    cy.contains("Deleting").should('not.exist');
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
  })
});