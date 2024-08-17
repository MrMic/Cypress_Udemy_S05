/// <reference types="cypress" />

describe('share location', () => {
  // * INFO: HOOK __________________________________________________________
  beforeEach(() => {
    cy.visit('/').then(win => {
      return cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserPosition')
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords: {
                latitude: 37.5,
                longitude: 48.01
              }
            });
          }, 100);
        })
    });
  })
  // ______________________________________________________________________
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('be.called');
    // Button is disabled after location is fetched
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });

  // ______________________________________________________________________
  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    // cy.get('[data-cy="actions"]').should('contain', 'Stored location URL copied to clipboard.');
  });
});
