import type Vector2 from '../vector/vector2';

export default class Bezier3 {
  constructor(
    public readonly p0: Vector2,
    public readonly p1: Vector2,
    public readonly p2: Vector2,
    public readonly p3: Vector2,
  ) {}
}
