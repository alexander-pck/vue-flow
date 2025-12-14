<script lang="ts" setup>
import type { Position } from '@vue-flow/core'
import { EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

interface CustomEdgeProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
  style?: CSSProperties
}

const props = defineProps<CustomEdgeProps>()

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <path 
    :id="id" 
    :style="style" 
    class="vue-flow__edge-path" 
    :d="path[0]" 
    :marker-end="markerEnd" 
  />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <button class="edge-button" @click="removeEdges(id)">×</button>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.edge-button {
  width: 20px;
  height: 20px;
  background: #eee;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

.edge-button:hover {
  background: #f05f75;
  color: white;
}
</style>
