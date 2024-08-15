/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
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
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('be.called');
    // Button is disabled after location is fetched
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });
});
