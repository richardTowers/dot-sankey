const dotSankey = require('../index')
const assert = require('assert')

describe('dotSankey', () => {
  describe('dotToData', () => {
    it('should convert empty DOT to empty sankey', () => {
      const result = dotSankey.dotToData(`digraph {}`)
      assert.deepStrictEqual({
        nodes: [],
        links: []
      }, result)
    })

    it('should convert simple DOT to nodes / links data', () => {
      const result = dotSankey.dotToData(`digraph {
        A -> B [value=1]
      }`)
      assert.deepStrictEqual({
        nodes: [{ name: 'A' }, { name: 'B' }],
        links: [{ source: 0, target: 1, value: '1' }]
      }, result)
    })

    it('should error when given badly formed input', () => {
      assert.throws(() => dotSankey.dotToData(`digraph {`), /Failed to parse input - is it valid DOT\?/)
    })
  })
  describe('dotToSankey', () => {
    it('should convert simple DOT to sankey', () => {
      const result = dotSankey.dotToSankey(`digraph {
        A -> B [value=1]
      }`)
      assert.strictEqual(result.links.length, 1)
      assert.strictEqual(result.nodes.length, 2)
      assert.strictEqual(result.links[0].source, result.nodes[0])
      assert.strictEqual(result.links[0].target, result.nodes[1])
    })
  })
})
