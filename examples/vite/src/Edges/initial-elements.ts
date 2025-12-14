import type { Edge, Node } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'

export const initialNodes: Node[] = [
  { id: '1', type: 'input', label: 'Start', position: { x: 50, y: 50 } },
  { id: '2', label: 'Node 2', position: { x: 250, y: 50 } },
  { id: '3', label: 'Node 3', position: { x: 450, y: 50 } },
  { id: '4', type: 'customNode', label: 'Custom Node', position: { x: 250, y: 200 } },
  { id: '5', type: 'output', label: 'End', position: { x: 450, y: 200 } },
]

export const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    label: 'Default Edge',
    updatable: true 
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    type: 'custom', 
    label: 'Custom Edge',
    markerEnd: { type: MarkerType.ArrowClosed },
    updatable: true 
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5', 
    type: 'custom2', 
    label: 'Custom Edge 2',
    updatable: true 
  },
]
