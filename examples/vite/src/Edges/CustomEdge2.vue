<script lang="ts" setup>
import type { Position } from '@vue-flow/core'
import { BezierEdge } from '@vue-flow/core'

interface CustomEdge2Props {
  id: string
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  markerEnd?: string
}

defineProps<CustomEdge2Props>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <BezierEdge
    label="Gradient Edge"
    :source-x="sourceX"
    :source-y="sourceY"
    :target-x="targetX"
    :target-y="targetY"
    :source-position="sourcePosition"
    :target-position="targetPosition"
    :marker-end="markerEnd"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: '#8f00ff' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
    :style="{
      stroke: 'url(#gradient-' + id + ')',
      strokeWidth: 3,
    }"
  />
  <svg style="position: absolute; width: 0; height: 0">
    <defs>
      <linearGradient :id="'gradient-' + id" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00eaff"/>
        <stop offset="100%" stop-color="#8f00ff"/>
      </linearGradient>
    </defs>
  </svg>
</template>
