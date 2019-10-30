import * as assert from 'assert'
import transformComponentNameToStyleName from '../../utils/transformComponentNameToStyleName'

describe('utils/transformComponentNameToStyleName', () => {
  describe('Foo', () => {
    it('should return "foo"', () => {
      assert.equal(transformComponentNameToStyleName('Foo'), 'foo')
    })
  })

  describe('FooBar', () => {
    it('should return "foo-bar"', () => {
      assert.equal(transformComponentNameToStyleName('FooBar'), 'foo-bar')
    })
  })

  describe('AComponent', () => {
    it('should return "a-component"', () => {
      assert.equal(transformComponentNameToStyleName('AComponent'), 'a-component')
    })
  })

  describe('SomeCDNSolution', () => {
    it('should return "some-cdn-solution"', () => {
      assert.equal(transformComponentNameToStyleName('SomeCDNSolution'), 'some-cdn-solution')
    })
  })

  describe('AGreatCDN', () => {
    it('should return "a-great-cdn"', () => {
      assert.equal(transformComponentNameToStyleName('AGreatCDN'), 'a-great-cdn')
    })
  })

  describe('Error404', () => {
    it('should return "error-404"', () => {
      assert.equal(transformComponentNameToStyleName('Error404'), 'error-404')
    })
  })

  describe('Error404Page', () => {
    it('should return "error-404-page"', () => {
      assert.equal(transformComponentNameToStyleName('Error404Page'), 'error-404-page')
    })
  })

  describe('Page1Child2', () => {
    it('should return "page-1-child-2"', () => {
      assert.equal(transformComponentNameToStyleName('Page1Child2'), 'page-1-child-2')
    })
  })
})
