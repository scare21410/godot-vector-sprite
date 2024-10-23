import { Bezier2, Bezier3, Vector2 } from '@scare21410/godot-vector-sprite';

/**
 * Approximate cubic Bézier curve with two quadratic Bézier curves.
 * The algorithm is based on the reversal of degree elevation.
 * https://stackoverflow.com/questions/2009160/how-do-i-convert-the-2-control-points-of-a-cubic-curve-to-the-single-control-poi
 * @param curve A curve to approximate as quadratic Bézier curves.
 *              Always returns one quadratic Bézier curve.
 */
export default function approximateMidpoint(curve: Bezier3): Bezier2[] {
  // P1 = -1/4 Q0 + 3/4 Q1 + 3/4 Q2 - 1/4 Q3
  const controlPoint = new Vector2([
    -0.25 * curve.p0.x() +
      0.75 * curve.p1.x() +
      0.75 * curve.p2.x() -
      0.25 * curve.p3.x(),

    -0.25 * curve.p0.y() +
      0.75 * curve.p1.y() +
      0.75 * curve.p2.y() -
      0.25 * curve.p3.y(),
  ]);
  return [new Bezier2(curve.p0, controlPoint, curve.p3)];
}
