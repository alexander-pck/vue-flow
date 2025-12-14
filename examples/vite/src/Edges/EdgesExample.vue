<script lang="ts" setup>
import { VueFlow,FlowEvents,useVueFlow,ConnectionMode} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import CustomEdge from './CustomEdge.vue'
import CustomEdge2 from './CustomEdge2.vue'
import ColorSelectorNode from './CustomNode.vue'
import { initialEdges, initialNodes } from './initial-elements'
import { ref } from 'vue'

const edges = ref([...initialEdges])
const nodes = ref([...initialNodes])

const { updateEdge,nodesConnectable,onConnect,addEdges } = useVueFlow()
function onEdgeUpdateStart({ edge }: FlowEvents['edgeUpdateStart']) {
  return console.log('start update', edge)
}

function onEdgeUpdateEnd({ edge }: FlowEvents['edgeUpdateEnd']) {
  return console.log('end update', edge)
}

function onEdgeUpdate({ edge, connection }: FlowEvents['edgeUpdate']) {
  return updateEdge(edge, connection)
}
// function onConnectEnd(params: any) {
//   return addEdge(params)
// }
onConnect(addEdges)
nodesConnectable.value=true
</script>

<template>
  <VueFlow 
  v-model:edges="edges"
  v-model:nodes="nodes"
  fit-view-on-init 
  snap-to-grid 
  :connection-mode="ConnectionMode.Loose"
    @edge-update="onEdgeUpdate"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
    
  >
    <template #node-selectorNode="props">
      <ColorSelectorNode v-bind="props" />
    </template>
    <template #edge-custom="props">
      <CustomEdge v-bind="props" />
    </template>

    <template #edge-custom2="props">
      <CustomEdge2 v-bind="props" />
    </template>

    <MiniMap />
    <Controls />
    <Background />
  </VueFlow>
</template>
