'use strict'

const fs = require('fs')
const dot = require('graphlib-dot')
const d3Sankey = require('d3-sankey')

function dotToData (buffer) {
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

function dotToSankey (buffer) {
  const sankey = d3Sankey.sankey()
  const data = dotToData(buffer)
  return sankey(data)
}

if (typeof require !== 'undefined' && require.main === module) {
  const stdinBuffer = fs.readFileSync(0, 'utf-8')
  const data = dotToData(stdinBuffer)
  process.stdout.write(JSON.stringify(data, null, 2))
}

if (typeof module !== 'undefined') {
  module.exports.dotToData = dotToData
  module.exports.dotToSankey = dotToSankey
}
