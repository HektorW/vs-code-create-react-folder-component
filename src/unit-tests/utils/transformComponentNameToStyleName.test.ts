import { describe, it } from 'mocha'
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
})
