<script lang="ts" setup>
import type {  Position } from '@vue-flow/core'
import { BezierEdge } from '@vue-flow/core'

interface CustomData {
  text: string
}

interface CustomEdgeProps  {
  source: string
  target: string
  sourceHandleId?: string
  targetHandleId?: string
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd: string
  data: CustomData
}

defineProps<CustomEdgeProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <BezierEdge
    :label="data.text"
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
    :marker-end="markerEnd"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
    :style="{
      stroke: 'url(#cool-gradient-' + id + ')',
      strokeWidth: 4,
      filter: 'drop-shadow(0 0 6px #00eaff)'
    }"
  />
  <svg style="height: 0">
    <defs>
      <linearGradient :id="'cool-gradient-' + id" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00eaff"/>
        <stop offset="100%" stop-color="#8f00ff"/>
      </linearGradient>
    </defs>
  </svg>
</template>
