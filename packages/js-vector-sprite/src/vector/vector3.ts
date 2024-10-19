export default class Vector3 extends Array<number> {
  constructor(data?: Vector3 | ArrayLike<number> | ArrayBufferLike) {
    switch (true) {
      case data instanceof Vector3:
        super(...data);
        return;
      case data instanceof Float32Array:
        super(...data.slice(0, 3));
        return;
      case Array.isArray(data):
      case data instanceof ArrayBuffer:
        super(...new Float32Array(data));
        return;
      case data === undefined || data === null:
        super(0, 0, 0);
        return;
      default:
        throw new TypeError('Invalid data type');
    }
  }

  x(): number {
    return this[0];
  }

  y(): number {
    return this[1];
  }

  z(): number {
    return this[2];
  }

  static zero() {
    return new Vector3(new Float32Array(3));
  }
}
