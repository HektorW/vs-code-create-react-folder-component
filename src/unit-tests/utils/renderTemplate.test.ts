import { describe, it } from 'mocha'
import * as assert from 'assert'
import renderTemplate from '../../utils/renderTemplate'

describe('utils/renderTemplate', () => {
  describe('Without argument', () => {
    it('should not alter string', () => {
      const template = 'foo bar baz lol'

      assert.equal(renderTemplate(template, {}), template)
    })
  })

  describe('Single data replace', () => {
    it('should replace {{foo}}', () => {
      const template = 'Replace this {{foo}}'
      const expected = 'Replace this bar'

      assert.equal(renderTemplate(template, { foo: 'bar' }), expected)
    })
  })

  describe('Multiple data replace of same key', () => {
    it('should replace all {{foo}}', () => {
      const template = 'Replace multiple {{foo}} {{foo}}'
      const expected = 'Replace multiple bar bar'
      assert.equal(renderTemplate(template, { foo: 'bar' }), expected)
    })
  })

  describe('Multiple data replace of different keys', () => {
    it('should replace all {{foo}} and {{baz}}', () => {
      const template = 'Replace multiple {{foo}} {{baz}}'
      const expected = 'Replace multiple bar qxe'
      assert.equal(renderTemplate(template, { foo: 'bar', baz: 'qxe' }), expected)
    })
  })
})
