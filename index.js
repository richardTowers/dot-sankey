'use strict'

const fs = require('fs')
const dot = require('graphlib-dot')

function dotSankey (buffer) {
  let parsed
  try {
    parsed = dot.read(buffer)
  } catch (ex) {
    ex.message = `Failed to parse input - is it valid DOT? Error was ${ex.message}`
    throw ex
  }
  const nodeIndexByName = parsed.nodes().reduce((acc, x, index) => ({ ...acc, [x]: index }), {})
  const data = {
    nodes: parsed.nodes().map(x => ({ name: x })),
    links: parsed.edges().map(x => ({ source: nodeIndexByName[x.v], target: nodeIndexByName[x.w], ...(parsed.edge(x)) }))
  }
  return data
}

if (typeof require !== 'undefined' && require.main === module) {
  const stdinBuffer = fs.readFileSync(0, 'utf-8')
  const data = dotSankey(stdinBuffer)
  process.stdout.write(JSON.stringify(data, null, 2))
}

if (typeof module !== 'undefined') {
  module.exports = dotSankey
}
