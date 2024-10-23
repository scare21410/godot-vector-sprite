import { RefObject, useCallback, useEffect, useReducer, useRef } from 'react';
import { Vector2 } from '@scare21410/godot-vector-sprite';

type LineHandle = {
  id: number | string;
  start: Vector2;
  end: Vector2;
};

type DragContext = {
  handle: LineHandle;
  draggingComponent: 'start' | 'end';
  centerDiff: Vector2;
};

function calculateDragContext(
  handle: LineHandle,
  position: Vector2,
): DragContext | undefined {
  const startDistance = Math.hypot(
    handle.start.x() - position.x(),
    handle.start.y() - position.y(),
  );

  if (startDistance < 5.0) {
    return {
      handle,
      draggingComponent: 'start',
      centerDiff: new Vector2([
        handle.start.x() - position.x(),
        handle.start.y() - position.y(),
      ]),
    };
  }

  const endDistance = Math.hypot(
    handle.end.x() - position.x(),
    handle.end.y() - position.y(),
  );
  if (endDistance < 5.0) {
    return {
      handle,
      draggingComponent: 'end',
      centerDiff: new Vector2([
        handle.end.x() - position.x(),
        handle.end.y() - position.y(),
      ]),
    };
  }

  return undefined;
}

export default function useDraggableLineHandles(
  ref: RefObject<SVGSVGElement>,
  initialHandles?: LineHandle[],
): LineHandle[] {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handles = useRef(initialHandles ?? []);
  const context = useRef<DragContext | undefined>();

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      const position = new Vector2([event.offsetX, event.offsetY]);
      const dragContext = handles.current
        .map((h) => calculateDragContext(h, position))
        .find((c) => c != undefined);
      if (dragContext) {
        context.current = dragContext;
      }
    },
    [handles],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (context.current) {
        event.preventDefault();

        const { handle, draggingComponent, centerDiff } = context.current;
        const position = new Vector2([event.offsetX, event.offsetY]);
        if (draggingComponent === 'start') {
          handle.start = new Vector2([
            position.x() + centerDiff.x(),
            position.y() + centerDiff.y(),
          ]);
        } else {
          handle.end = new Vector2([
            position.x() + centerDiff.x(),
            position.y() + centerDiff.y(),
          ]);
        }
        forceUpdate();
      }
    },
    [handles],
  );

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault();

    context.current = undefined;
  }, []);

  useEffect(() => {
    const { current: element } = ref;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);

      return () => {
        if (element) {
          element.removeEventListener('mouseup', handleMouseUp);
          element.removeEventListener('mousemove', handleMouseMove);
          element.removeEventListener('mousedown', handleMouseDown);
        }
      };
    }
  }, [ref.current]);

  return handles.current;
}
