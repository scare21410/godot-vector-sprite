import { Bezier2 } from '@scare21410/godot-vector-sprite';

export default function calculateBezier2Path(bezier2: Bezier2): string {
  return `M ${bezier2.p0.x()},${bezier2.p0.y()} Q ${bezier2.p1.x()},${bezier2.p1.y()} ${bezier2.p2.x()},${bezier2.p2.y()}`;
}
