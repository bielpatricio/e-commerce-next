describe('template spec', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.get('button[id="close-notification"]').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[name=q]').type('moletom').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to add different sizes of product it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.get('button[id="close-notification"]').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.get('button[id="close-notification"]').click()
    cy.contains('G').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (2)').should('exist')
  })
})
