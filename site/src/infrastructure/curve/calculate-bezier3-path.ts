import { Bezier3 } from '@scare21410/godot-vector-sprite';

export default function calculateBezier3Path(bezier3: Bezier3): string {
  return `M ${bezier3.p0.x()},${bezier3.p0.y()} C ${bezier3.p1.x()},${bezier3.p1.y()} ${bezier3.p2.x()},${bezier3.p2.y()} ${bezier3.p3.x()},${bezier3.p3.y()}`;
}
