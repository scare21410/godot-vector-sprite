import { Vector2 } from '@scare21410/godot-vector-sprite';

type Props = {
  start: Vector2;
  end: Vector2;
};

export default function LineHandle({ start, end }: Props) {
  return (
    <>
      <line
        x1={start.x()}
        y1={start.y()}
        x2={end.x()}
        y2={end.y()}
        stroke="black"
        strokeDasharray="5,5"
        strokeWidth="1"
      />
      <circle
        cx={start.x()}
        cy={start.y()}
        r="5"
        fill="red"
        style={{ cursor: 'crosshair' }}
      />
      <circle
        cx={end.x()}
        cy={end.y()}
        r="5"
        fill="red"
        style={{ cursor: 'crosshair' }}
      />
    </>
  );
}
