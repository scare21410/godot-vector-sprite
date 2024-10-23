import type Vector2 from '../vector/vector2';

export default class Bezier2 {
  constructor(
    public readonly p0: Vector2,
    public readonly p1: Vector2,
    public readonly p2: Vector2,
  ) {}
}
