const dotSankey = require('../index')
const assert = require('assert')

describe('dotSankey', () => {
  it('should convert empty DOT to empty sankey', () => {
    const result = dotSankey(`digraph {}`)
    assert.deepStrictEqual({
      nodes: [],
      links: []
    }, result)
  })

  it('should convert simple DOT to sankey', () => {
    const result = dotSankey(`digraph {
      A -> B [value=1]
    }`)
    assert.deepStrictEqual({
      nodes: [{ name: 'A' }, { name: 'B' }],
      links: [{ source: 0, target: 1, value: '1' }]
    }, result)
  })

  it('should error when given badly formed input', () => {
    assert.throws(() => dotSankey(`digraph {`), /Failed to parse input - is it valid DOT\?/)
  })
})
