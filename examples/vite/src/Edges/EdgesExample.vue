<script lang="ts" setup>
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { ref } from 'vue'

import CustomEdge from './CustomEdge.vue'
import CustomNode from './CustomNode.vue'
import { initialEdges, initialNodes } from './initial-elements'

const edges = ref(initialEdges)
const nodes = ref(initialNodes)

const { updateEdge, addEdges, onConnect } = useVueFlow()

// Handle edge updates (dragging edge endpoints)
function onEdgeUpdate({ edge, connection }: any) {
  updateEdge(edge, connection)
}

// Handle new connections (creating edges by dragging from handles)
// The connection will include the 'type' field if createEdgeType was specified on the handle
onConnect(addEdges)
</script>

<template>
  <VueFlow 
    v-model:edges="edges"
    v-model:nodes="nodes"
    fit-view-on-init 
    :nodes-connectable="true"
    :connection-mode="ConnectionMode.Loose"
    :keepEdgeTypeDuringUpdate="false"
    @edge-update="onEdgeUpdate"
  >
    <!-- Custom node with handles that specify edge types -->
    <template #node-customNode="props">
      <CustomNode v-bind="props" />
    </template>

    <!-- Custom edge types -->
    <template #edge-custom="props">
      <CustomEdge v-bind="props" />
    </template>

    <Background />
    <Controls />
  </VueFlow>
</template>
