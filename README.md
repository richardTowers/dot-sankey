dot-sankey
==========

Converts directed acyclic graphs in
[DOT](https://graphviz.gitlab.io/_pages/doc/info/lang.html) format into Sankey
diagrams using [D3](https://d3js.org/).

Usage
-----

```
$ echo '
digraph {
  A -> C [value=50]
  B -> C [value=50]
  C -> D [value=100]
}' > input.dot

$ npx dot-sankey < input.dot
{
  "nodes": [
    {
      "name": "A"
    },
    {
      "name": "C"
    },
    {
      "name": "B"
    },
    {
      "name": "D"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 1,
      "value": "50"
    },
    {
      "source": 2,
      "target": 1,
      "value": "50"
    },
    {
      "source": 1,
      "target": 3,
      "value": "100"
    }
  ]
}
```
