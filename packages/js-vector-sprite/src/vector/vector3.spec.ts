import { expect, describe, it } from 'bun:test';
import Vector3 from './vector3';

describe('Vector3', () => {
  it('should create zero vector', () => {
    const v = Vector3.zero();
    expect(v).toBeInstanceOf(Vector3);
    expect(v).toEqual(new Vector3([0, 0, 0]));
  });

  it('should create vector with default values', () => {
    const v = new Vector3();
    expect(v).toBeInstanceOf(Vector3);
    expect(v).toEqual(new Vector3([0, 0, 0]));
  });

  it('should create vector from array', () => {
    const v = new Vector3([1, 2, 3]);
    expect(v).toBeInstanceOf(Vector3);
    expect(v.x()).toBe(1);
    expect(v.y()).toBe(2);
    expect(v.z()).toBe(3);
  });

  it('should create vector from Float32Array', () => {
    const v = new Vector3(new Float32Array([1, 2, 3]));
    expect(v).toBeInstanceOf(Vector3);
    expect(v).toEqual(new Vector3([1, 2, 3]));
  });

  it('should create vector from another vector', () => {
    const v1 = new Vector3([1, 2, 3]);
    const v2 = new Vector3(v1);
    expect(v2).toBeInstanceOf(Vector3);
    expect(v2).toEqual(new Vector3([1, 2, 3]));
  });
});
