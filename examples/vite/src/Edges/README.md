# Edge Preview with Custom Edge Types

This example demonstrates how to create custom edge types that render as previews during connection creation and edge updates.

## Overview

When dragging from a handle or updating an existing edge, Vue Flow can show a preview of the actual edge type instead of the default ConnectionLine. This provides better visual feedback and shows exactly what the final edge will look like.

## Key Features

### 1. Custom Edge Type Preview

Specify `createEdgeType` on handles to define which edge type to use when creating connections:

```vue
<Handle 
  type="source" 
  :position="Position.Right"
  :createEdgeType="'custom2'"
/>
```

When you drag from this handle, you'll see a preview of the `custom2` edge type following your cursor.

### 2. Edge Type Preservation

When a connection is created with `createEdgeType` specified, the connection object includes a `type` field. When using `addEdges()` with this connection, the edge will automatically be created with the specified type:

```typescript
// Connection automatically includes type: 'custom2'
onConnect(addEdges)
```

### 3. Edge Update Preview

When `keepEdgeTypeDuringUpdate` is enabled (default), dragging edge endpoints shows the edge with dynamic coordinates instead of hiding it:

```vue
<VueFlow :keepEdgeTypeDuringUpdate="true">
  <!-- Edge updates show preview -->
</VueFlow>
```

## Configuration

### Handle-Level: `createEdgeType`

Set on individual handles to specify edge type for connections:
- Type: `string | null`
- Default: `null`

### Global: `keepEdgeTypeDuringUpdate`

Set on VueFlow component to enable/disable edge preview during updates:
- Type: `boolean`
- Default: `true`

## Files in this Example

- **EdgesExample.vue** - Main example component
- **CustomNode.vue** - Node with handles that specify custom edge types
- **CustomEdge.vue** - Custom edge with delete button
- **CustomEdge2.vue** - Custom edge with gradient styling
- **initial-elements.ts** - Initial nodes and edges

## Behavior

| Scenario | Result |
|----------|--------|
| Drag from handle with `createEdgeType` | Shows custom edge preview |
| Drag from handle without `createEdgeType` | Shows default ConnectionLine |
| Update edge with `keepEdgeTypeDuringUpdate=true` | Shows edge with dynamic coordinates |
| Update edge with `keepEdgeTypeDuringUpdate=false` | Shows ConnectionLine |

## Implementation Notes

- The `type` field is automatically added to connections when `createEdgeType` is specified
- `addEdges()` preserves the type when creating edges from connections
- Edge preview only works when a valid edge type is registered
- Falls back to ConnectionLine if edge type is not found


