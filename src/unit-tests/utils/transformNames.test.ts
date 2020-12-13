import * as assert from 'assert'
import {
  getCamelCaseName,
  getCleanedInputName,
  getPascalCaseName,
  getSnakeCaseName,
  getKebabCaseName,
  splitNameIntoParts,
} from '../../utils/transformNames'

describe('utils/transformNames/splitNameIntoParts', () => {
  describe('Foo', () => {
    it('should return ["Foo"]', () => {
      assertEqualArray(splitNameIntoParts('Foo'), ['Foo'])
    })
  })

  describe('FooBar', () => {
    it('should return ["Foo", "Bar"]', () => {
      assertEqualArray(splitNameIntoParts('FooBar'), ['Foo', 'Bar'])
    })
  })

  describe('FType', () => {
    it('should return ["F", "Type"]', () => {
      assertEqualArray(splitNameIntoParts('FType'), ['F', 'Type'])
    })
  })

  describe('TypeF', () => {
    it('should return ["Type", "F"]', () => {
      assertEqualArray(splitNameIntoParts('TypeF'), ['Type', 'F'])
    })
  })

  describe('SomeCDNSolution', () => {
    it('should return ["Some", "CDN", "Solution"]', () => {
      assertEqualArray(splitNameIntoParts('SomeCDNSolution'), ['Some', 'CDN', 'Solution'])
    })
  })

  describe('AGreatCDN', () => {
    it('should return ["A", "Great", "CDN"]', () => {
      assertEqualArray(splitNameIntoParts('AGreatCDN'), ['A', 'Great', 'CDN'])
    })
  })

  describe('Error404', () => {
    it('should return ["Error", "404"]', () => {
      assertEqualArray(splitNameIntoParts('Error404'), ['Error', '404'])
    })
  })

  describe('Error404Page', () => {
    it('should return ["Error", "404", "Page"]', () => {
      assertEqualArray(splitNameIntoParts('Error404Page'), ['Error', '404', 'Page'])
    })
  })

  describe('Page1Child2', () => {
    it('should return ["Page", "1", "Child", "2"]', () => {
      assertEqualArray(splitNameIntoParts('Page1Child2'), ['Page', '1', 'Child', '2'])
    })
  })

  describe('CDNStorage', () => {
    it('should return ["CDN", "Storage"]', () => {
      assertEqualArray(splitNameIntoParts('CDNStorage'), ['CDN', 'Storage'])
    })
  })

  describe('404Page', () => {
    it('should return ["404", "Page"]', () => {
      assertEqualArray(splitNameIntoParts('404Page'), ['404', 'Page'])
    })
  })

  describe('BGParts', () => {
    it('should return ["BG", "Parts"]', () => {
      assertEqualArray(splitNameIntoParts('BGParts'), ['BG', 'Parts'])
    })
  })

  describe('I', () => {
    it('should return ["I"]', () => {
      assertEqualArray(splitNameIntoParts('I'), ['I'])
    })
  })
})

describe('utils/transformNames/getCleanedInputName', () => {
  describe('"Foo"', () => {
    it('should return "Foo"', () => {
      assert.strictEqual(getCleanedInputName('Foo'), 'Foo')
    })
  })

  describe('"Foo "', () => {
    it('should return "Foo"', () => {
      assert.strictEqual(getCleanedInputName('Foo '), 'Foo')
    })
  })

  describe('" Foo"', () => {
    it('should return "Foo"', () => {
      assert.strictEqual(getCleanedInputName(' Foo'), 'Foo')
    })
  })

  describe('"  Foo  "', () => {
    it('should return "Foo"', () => {
      assert.strictEqual(getCleanedInputName('  Foo  '), 'Foo')
    })
  })

  describe('"Foo Bar"', () => {
    it('should return "FooBar"', () => {
      assert.strictEqual(getCleanedInputName('Foo Bar'), 'FooBar')
    })
  })

  describe('"  Foo  Bar  "', () => {
    it('should return "FooBar"', () => {
      assert.strictEqual(getCleanedInputName('  Foo  Bar  '), 'FooBar')
    })
  })
})

describe('utils/transformNames/getCamelCaseName', () => {
  describe('Foo', () => {
    it('should return "foo"', () => {
      assert.strictEqual(getCamelCaseName('Foo'), 'foo')
    })
  })

  describe('FooBar', () => {
    it('should return "fooBar"', () => {
      assert.strictEqual(getCamelCaseName('FooBar'), 'fooBar')
    })
  })

  describe('foo', () => {
    it('should return "foo"', () => {
      assert.strictEqual(getCamelCaseName('foo'), 'foo')
    })
  })

  describe('FType', () => {
    it('should return "fType"', () => {
      assert.strictEqual(getCamelCaseName('FType'), 'fType')
    })
  })

  describe('CDNStorage', () => {
    it('should return "cdnStorage', () => {
      assert.strictEqual(getCamelCaseName('CDNStorage'), 'cdnStorage')
    })
  })

  describe('BGParts', () => {
    it('should return "bgParts"', () => {
      assert.strictEqual(getCamelCaseName('BGParts'), 'bgParts')
    })
  })

  describe('I', () => {
    it('should return "i"', () => {
      assert.strictEqual(getCamelCaseName('I'), 'i')
    })
  })
})

describe('utils/transformNames/getPascalCaseName', () => {
  describe('Foo', () => {
    it('should return "Foo"', () => {
      assert.strictEqual(getPascalCaseName('Foo'), 'Foo')
    })
  })

  describe('fooBar', () => {
    it('should return "fooBar"', () => {
      assert.strictEqual(getPascalCaseName('fooBar'), 'FooBar')
    })
  })
})

describe('utils/transformNames/getSnakeCaseName', () => {
  describe('Foo', () => {
    it('should return "foo"', () => {
      assert.strictEqual(getSnakeCaseName('Foo'), 'foo')
    })
  })

  describe('FooBar', () => {
    it('should return "foo_bar"', () => {
      assert.strictEqual(getSnakeCaseName('FooBar'), 'foo_bar')
    })
  })

  describe('CDNStorage', () => {
    it('should return "cdn_storage"', () => {
      assert.strictEqual(getSnakeCaseName('CDNStorage'), 'cdn_storage')
    })
  })

  describe('Page1Child2', () => {
    it('should return "page_1_child_2"', () => {
      assert.strictEqual(getSnakeCaseName('Page1Child2'), 'page_1_child_2')
    })
  })
})

describe('utils/transformNames/getKebabCaseName', () => {
  describe('Foo', () => {
    it('should return "foo"', () => {
      assert.strictEqual(getKebabCaseName('Foo'), 'foo')
    })
  })

  describe('FooBar', () => {
    it('should return "foo-bar"', () => {
      assert.strictEqual(getKebabCaseName('FooBar'), 'foo-bar')
    })
  })

  describe('CDNStorage', () => {
    it('should return "cdn-storage"', () => {
      assert.strictEqual(getKebabCaseName('CDNStorage'), 'cdn-storage')
    })
  })

  describe('Page1Child2', () => {
    it('should return "page-1-child-2"', () => {
      assert.strictEqual(getKebabCaseName('Page1Child2'), 'page-1-child-2')
    })
  })
})

function assertEqualArray<T>(result: T[], expected: T[]) {
  const message = `Received ["${result.join('", "')}"], expected ["${expected.join('", "')}"]`

  assert.strictEqual(result.length, expected.length, message)

  for (let index = 0; index < result.length; index++) {
    assert.strictEqual(result[index], expected[index], message)
  }
}
