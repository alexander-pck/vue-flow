# Edge Preview Example

This example demonstrates the edge preview feature when creating connections in Vue Flow.

## Features

### Custom Edge Type Preview
When dragging from a handle with `createEdgeType` specified, the edge will render with its custom type instead of showing the default ConnectionLine. This provides a better visual preview of what the final edge will look like.

### Usage

In your custom node component, specify the `createEdgeType` prop on the Handle component:

```vue
<Handle 
  id="a" 
  type="source" 
  :position="Position.Right" 
  :createEdgeType="'custom2'"
/>
```

When you drag from this handle to create a new connection, you'll see a preview of the `custom2` edge type following your cursor instead of the default connection line.

### Components in this Example

- **CustomNode.vue** - A custom node with handles that specify custom edge types
- **CustomEdge.vue** - A custom edge component with a delete button
- **CustomEdge2.vue** - Another custom edge variant
- **EdgesExample.vue** - The main example showing edge updates and custom types

### Edge Update Behavior

When updating an existing edge by dragging its endpoint, the edge will render with dynamic coordinates following your cursor, maintaining its custom appearance throughout the drag operation.

### Configuration

The edge preview behavior is controlled by the `createEdgeType` parameter:
- **With createEdgeType**: Shows custom edge preview during connection
- **Without createEdgeType**: Shows default ConnectionLine (original behavior)

This maintains backward compatibility with existing code while providing enhanced visual feedback for new implementations.
