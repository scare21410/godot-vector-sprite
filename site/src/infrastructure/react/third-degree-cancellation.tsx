import React from 'react';
import type { Bezier3 } from '@scare21410/godot-vector-sprite';

type Props = {
  width: number;
  height: number;
  className?: string;
  initialCurve: Bezier3;
};
export default function ThirdDegreeCancellation({
  width,
  height,
  className,
  initialCurve,
}: Props) {
  return <svg width={width} height={height} className={className}></svg>;
}
