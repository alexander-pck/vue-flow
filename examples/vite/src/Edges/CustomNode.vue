<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'




</script>

<template>
  <div class="custom-node">
    <div class="custom-node-body">
      Node with Custom Edge Type
    </div>

    <!-- Handles with createEdgeType specified will create edges with that type -->
    <Handle 
      id="a" 
      type="target" 
      :position="Position.Top" 
    />
    <Handle 
      id="b" 
      type="source" 
      :position="Position.Bottom" 
      createEdgeType="custom"
    />
  </div>
</template>

<style scoped>
.custom-node {
  padding: 10px;
  border: 2px solid #555;
  border-radius: 5px;
  background: white;
}

.custom-node-body {
  text-align: center;
  font-size: 12px;
}
</style>
