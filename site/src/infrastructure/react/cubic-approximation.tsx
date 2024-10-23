import React, { useRef } from 'react';
import { type Bezier2, Bezier3 } from '@scare21410/godot-vector-sprite';
import approximateMidpoint from '../../application/algorithm/approximate-midpoint';
import calculateBezier2Path from '../curve/calculate-bezier2-path';
import calculateBezier3Path from '../curve/calculate-bezier3-path';
import useDraggableLineHandles from './use-draggable-line-handles';
import LineHandle from './line-handle';

type Props = {
  width: number;
  height: number;
  className?: string;
  initialCurve: Bezier3;
};

function calculateBezier2Key(curve2: Bezier2) {
  return `${curve2.p0.x()},${curve2.p0.y()}-${curve2.p1.x()},${curve2.p1.y()}-${curve2.p2.x()},${curve2.p2.y()}`;
}

function calculateBezier3Handles(curve: Bezier3) {
  return [{
    id: 1,
    start: curve.p0,
    end: curve.p1,
  }, {
    id: 2,
    start: curve.p2,
    end: curve.p3,
  }];
}

export default function CubicApproximation({
  className,
  width,
  height,
  initialCurve,
}: Props) {
  const elementRef = useRef<SVGSVGElement | null>(null);

  const handles = useDraggableLineHandles(elementRef, calculateBezier3Handles(initialCurve));
  const curve = new Bezier3(handles[0].start, handles[0].end, handles[1].start, handles[1].end);
  const quadCurves = approximateMidpoint(curve);

  return (
    <svg
      ref={elementRef}
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect width={width} height={height} fill="white" />
      {quadCurves.map((curve2) => (
        <path
          key={calculateBezier2Key(curve2)}
          d={calculateBezier2Path(curve2)}
          fill="currentColor"
          strokeWidth="2"
          className="interactive-area"
        />
      ))}
      <path
        d={calculateBezier3Path(curve)}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {handles.map((handle) => (
        <LineHandle key={handle.id} start={handle.start} end={handle.end} />
      ))}
    </svg>
  );
}
