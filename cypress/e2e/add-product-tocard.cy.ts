describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()
    cy.get('button[id="close-notification"]').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and and add it to the cart', () => {
    cy.searchByQuery('moletom')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('GG').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to add different sizes of product it to the cart', () => {
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
