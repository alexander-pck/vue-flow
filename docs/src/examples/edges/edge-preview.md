# Edge Preview

When creating new connections or updating existing edges, Vue Flow can show a preview of your custom edge type instead of the default connection line. This provides better visual feedback and shows exactly what the final edge will look like.

## Features

### Preview During Connection Creation

Specify the `createEdgeType` prop on handles to define which edge type to use when creating connections:

```vue
<Handle 
  type="source" 
  :position="Position.Right"
  :createEdgeType="'custom'"
/>
```

When dragging from this handle, the connection preview will render using your custom edge component instead of the default connection line.

### Preview During Edge Updates

When `keepEdgeTypeDuringUpdate` is enabled (default), dragging edge endpoints shows the edge with dynamic coordinates following your cursor:

```vue
<VueFlow :keepEdgeTypeDuringUpdate="true">
  <!-- Edge updates show live preview -->
</VueFlow>
```

### Automatic Edge Type Preservation

Connections created with `createEdgeType` automatically include the type field. When using `addEdges()`, the edge will be created with the specified type:

```typescript
const { addEdges } = useVueFlow()

// Connections from handles with createEdgeType will include type field
onConnect(addEdges)
```

## Configuration

### `createEdgeType` (Handle-level)

Configure individual handles to specify which edge type to use for connections:

```vue
<Handle 
  id="output" 
  type="source" 
  :position="Position.Right"
  :createEdgeType="'smoothstep'"
/>
```

- **Type:** `string | null`
- **Default:** `null`
- **Behavior:** When `null`, shows default ConnectionLine

### `keepEdgeTypeDuringUpdate` (Global)

Configure VueFlow to enable/disable edge preview during updates:

```vue
<VueFlow 
  :keepEdgeTypeDuringUpdate="true"
  v-model:nodes="nodes"
  v-model:edges="edges"
>
  <!-- content -->
</VueFlow>
```

- **Type:** `boolean`
- **Default:** `true`
- **Behavior:** 
  - `true` - Shows edge with dynamic coordinates during updates
  - `false` - Shows ConnectionLine (classic behavior)

## Example

<div class="mt-6">
  <ClientOnly>
    <Suspense>
      <Repl example="edges"></Repl>
    </Suspense>
  </ClientOnly>
</div>

## Behavior Summary

| Scenario | createEdgeType | keepEdgeTypeDuringUpdate | Result |
|----------|---------------|---------------------|---------|
| Creating connection | Set | N/A | Custom edge preview |
| Creating connection | null | N/A | ConnectionLine |
| Updating edge | Set | true | Edge with dynamic coordinates |
| Updating edge | Set | false | ConnectionLine |
| Updating edge | null | Any | ConnectionLine |

## Implementation Notes

- Edge preview only works when the specified edge type is registered with VueFlow
- If the edge type is not found, it falls back to the default edge type
- The preview component has `pointerEvents: 'none'` to prevent interference with interaction
- ConnectionLine is automatically hidden when custom edge preview is active

## Backward Compatibility

This feature is fully backward compatible:
- Without `createEdgeType`, behavior is unchanged (shows ConnectionLine)
- `keepEdgeTypeDuringUpdate` defaults to `true`, but can be disabled for classic behavior
- Existing code continues to work without modifications
