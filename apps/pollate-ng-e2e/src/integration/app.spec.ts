import { getGreeting } from '../support/app.po';

describe('pollate', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Pollate', () => {
    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Pollate');
  });
});
