<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { Handle, Position } from '@vue-flow/core'

const handleStyle: CSSProperties = { 
  background: '#555',
  width: '8px',
  height: '8px',
}

const handleStyleA: CSSProperties = { 
  ...handleStyle, 
  top: '25%',
}

const handleStyleB: CSSProperties = { 
  ...handleStyle, 
  top: '75%',
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="custom-node">
    <div class="custom-node-body">
      Node with Custom Edge Type
    </div>

    <!-- Handles with createEdgeType specified will create edges with that type -->
    <Handle 
      id="a" 
      type="source" 
      :position="Position.Right" 
      :style="handleStyleA" 
      :createEdgeType="'custom2'"
    />
    <Handle 
      id="b" 
      type="source" 
      :position="Position.Right" 
      :style="handleStyleB" 
      :createEdgeType="'custom2'"
    />
  </div>
</template>

<style scoped>
.custom-node {
  padding: 10px;
  border: 2px solid #555;
  border-radius: 5px;
  background: white;
  min-width: 150px;
}

.custom-node-body {
  text-align: center;
  font-size: 12px;
}
</style>
