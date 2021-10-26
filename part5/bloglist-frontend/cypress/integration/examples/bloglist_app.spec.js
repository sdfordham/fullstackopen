describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'cypress-testing',
      username: 'cypress-testing-un',
      password: 'cypress-testing-pw'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('login')
  })

  describe('Login',function() {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type('cypress-testing-un')
      cy.get('#password').type('cypress-testing-pw')
      cy.get('#login-button').click()
      cy.contains('Successfully logged in')
    })

    it('Fails with wrong credentials', function() {
      cy.get('#username').type('foo')
      cy.get('#password').type('bar')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'cypress-testing-un',
        password: 'cypress-testing-pw'
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#new-blog-title').type('Blog title')
      cy.get('#new-blog-author').type('Blog author')
      cy.get('#new-blog-url').type('Blog URL')
      cy.get('#button-create-blog').click()
      cy.contains('New blog added')
      cy.get('#blog-list').contains('Blog title')
      cy.get('#blog-list').contains('Blog author')
    })
  })

  describe('After creating a blog', function() {
    beforeEach(function() {
      cy.login({
        username: 'cypress-testing-un',
        password: 'cypress-testing-pw'
      })
      cy.createBlog({
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 0
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed by the creator', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
    })
  })
})
