<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { Handle, Position } from '@vue-flow/core'


const targetHandleStyle: CSSProperties = { background: '#555' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: '10px' }
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: '10px', top: 'auto' }
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    Custom Color Picker Node
  </div>

  <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" :createEdgeType="'custom2'"/>
  <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" :createEdgeType="'custom2'"/>
</template>
