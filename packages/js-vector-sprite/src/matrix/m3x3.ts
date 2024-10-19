import Vector3 from '../vector/vector3.js';

export default class M3x3 extends Array<Vector3> {
  constructor(
    data?: M3x3 | ArrayLike<number> | ArrayLike<Vector3> | ArrayBufferLike,
  ) {
    switch (true) {
      case data instanceof M3x3:
        super(...data);
        return;
      case data instanceof Float32Array:
        super(
          new Vector3(data.slice(0, 3)),
          new Vector3(data.slice(3, 6)),
          new Vector3(data.slice(6, 9)),
        );
        return;
      case Array.isArray(data):
        if (data.length >= 9 && data.slice(0, 9).every((v) => typeof v === 'number')) {
          super(
            new Vector3(data.slice(0, 3)),
            new Vector3(data.slice(3, 6)),
            new Vector3(data.slice(6, 9)),
          );
          return;
        }
        if (data.length >= 3 && data.every((v) => v instanceof Vector3)) {
          super(...data);
          return;
        }
        throw new TypeError('Invalid data type');

      case data instanceof ArrayBuffer:
        super(
          new Vector3(new Float32Array(data, 0, 3)),
          new Vector3(new Float32Array(data, 12, 3)),
          new Vector3(new Float32Array(data, 24, 3)),
        );
        return;
      case data === undefined || data === null:
        super(
          new Vector3([1, 0, 0]),
          new Vector3([0, 1, 0]),
          new Vector3([0, 0, 1]),
        );
        return;

      default:
        throw new TypeError('Invalid data type');
    }
  }

  transpose() {
    return new M3x3([
      new Vector3([this[0][0], this[1][0], this[2][0]]),
      new Vector3([this[0][1], this[1][1], this[2][1]]),
      new Vector3([this[0][2], this[1][2], this[2][2]]),
    ]);
  }

  static identity() {
    return new M3x3();
  }

  static zero() {
    return new M3x3(new Float32Array(9));
  }
}
