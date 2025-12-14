import { computed, defineComponent, getCurrentInstance, h, inject, resolveComponent } from 'vue'
import type { EdgeComponent, HandleElement } from '../../types'
import { ConnectionMode, Position } from '../../types'
import { getHandlePosition, getMarkerId, oppositePosition, pointToRendererPoint } from '../../utils'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'
import { getBezierPath } from '../Edges/utils'

const ConnectionEdge = defineComponent({
  name: 'ConnectionEdge',
  compatConfig: { MODE: 3 },
  setup() {
    const {
      id: vueFlowId,
      connectionMode,
      connectionStartHandle,
      connectionEndHandle,
      connectionPosition,
      connectionStatus,
      viewport,
      findNode,
      createEdgeType,
      getEdgeTypes,
    } = useVueFlow()

    const slots = inject(Slots)
    const instance = getCurrentInstance()

    const fromNode = computed(() => findNode(connectionStartHandle.value?.nodeId))
    const toNode = computed(() => findNode(connectionEndHandle.value?.nodeId) ?? null)

    return () => {
      // Only render when createEdgeType is specified
      if (!createEdgeType.value || !fromNode.value || !connectionStartHandle.value) {
        return null
      }

      const startHandleId = connectionStartHandle.value.id
      const handleType = connectionStartHandle.value.type

      const fromHandleBounds = fromNode.value.handleBounds
      let handleBounds = fromHandleBounds?.[handleType] ?? []

      if (connectionMode.value === ConnectionMode.Loose) {
        const oppositeBounds = fromHandleBounds?.[handleType === 'source' ? 'target' : 'source'] ?? []
        handleBounds = [...handleBounds, ...oppositeBounds]
      }

      if (!handleBounds || handleBounds.length === 0) {
        return null
      }

      const fromHandle = (startHandleId ? handleBounds.find((d) => d.id === startHandleId) : handleBounds[0]) ?? null
      const fromPosition = fromHandle?.position ?? Position.Top
      const { x: sourceX, y: sourceY } = getHandlePosition(fromNode.value, fromHandle, fromPosition)

      let toHandle: HandleElement | null = null
      let targetX: number
      let targetY: number
      let targetPosition: Position

      if (toNode.value && connectionEndHandle.value) {
        // When snapped to a handle
        if (connectionMode.value === ConnectionMode.Strict) {
          toHandle =
            toNode.value.handleBounds[handleType === 'source' ? 'target' : 'source']?.find(
              (d) => d.id === connectionEndHandle.value?.id,
            ) || null
        } else {
          toHandle =
            [...(toNode.value.handleBounds.source ?? []), ...(toNode.value.handleBounds.target ?? [])]?.find(
              (d) => d.id === connectionEndHandle.value?.id,
            ) || null
        }

        if (toHandle) {
          targetPosition = toHandle.position
          const targetHandlePosition = getHandlePosition(toNode.value, toHandle, targetPosition)
          targetX = targetHandlePosition.x
          targetY = targetHandlePosition.y
        } else {
          // Fallback to connection position
          const { x, y } = pointToRendererPoint(connectionPosition.value, viewport.value)
          targetX = x
          targetY = y
          targetPosition = connectionEndHandle.value?.position ?? oppositePosition[fromPosition]
        }
      } else {
        // Following mouse cursor
        const { x, y } = pointToRendererPoint(connectionPosition.value, viewport.value)
        targetX = x
        targetY = y
        targetPosition = oppositePosition[fromPosition]
      }

      // Get the edge component for the specified type
      const edgeTypeName = createEdgeType.value
      const slot = slots?.[`edge-${edgeTypeName}`]
      
      let edgeComponent: EdgeComponent | false = false
      
      if (slot) {
        edgeComponent = slot
      } else {
        let edgeType = getEdgeTypes.value[edgeTypeName]

        if (typeof edgeType === 'string') {
          if (instance) {
            const components = Object.keys(instance.appContext.components)
            if (components && components.includes(edgeTypeName)) {
              edgeType = resolveComponent(edgeTypeName, false) as EdgeComponent
            }
          }
        }

        if (edgeType && typeof edgeType !== 'string') {
          edgeComponent = edgeType
        } else {
          // Fallback to default edge type
          edgeComponent = getEdgeTypes.value.default
        }
      }

      if (!edgeComponent) {
        return null
      }

      // Calculate default path for positioning
      const [dAttr] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: fromPosition,
        targetX,
        targetY,
        targetPosition,
      })

      const markerStart = `url('#${getMarkerId(undefined, vueFlowId)}')`
      const markerEnd = `url('#${getMarkerId(undefined, vueFlowId)}')`

      return h(
        'svg',
        { class: 'vue-flow__edges vue-flow__connectionedge vue-flow__container' },
        h(
          'g',
          { class: ['vue-flow__edge', 'vue-flow__edge-preview', connectionStatus.value] },
          h(edgeComponent as any, {
            id: '__connection-edge-preview__',
            sourceNode: fromNode.value,
            targetNode: toNode.value ?? null,
            source: fromNode.value.id,
            target: toNode.value?.id ?? '',
            type: edgeTypeName,
            sourcePosition: fromPosition,
            targetPosition,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourceHandle: fromHandle,
            targetHandle: toHandle,
            markerStart,
            markerEnd,
            style: { pointerEvents: 'none' },
            data: {},
          }),
        ),
      )
    }
  },
})

export default ConnectionEdge
