import { expect, describe, it } from 'bun:test';
import Vector2 from './vector2';

describe('Vector2', () => {
  describe('constructor', () => {
    it('should create zero vector', () => {
      const v = Vector2.zero();
      expect(v).toBeInstanceOf(Vector2);
      expect(v).toEqual(new Vector2([0, 0]));
    });

    it('should create vector with default values', () => {
      const v = new Vector2();
      expect(v).toBeInstanceOf(Vector2);
      expect(v).toEqual(new Vector2([0, 0]));
    });

    it('should create vector from array', () => {
      const v = new Vector2([1, 2]);
      expect(v).toBeInstanceOf(Vector2);
      expect(v.x()).toBe(1);
      expect(v.y()).toBe(2);
    });

    it('should create vector from Float32Array', () => {
      const v = new Vector2(new Float32Array([1, 2]));
      expect(v).toBeInstanceOf(Vector2);
      expect(v).toEqual(new Vector2([1, 2]));
    });

    it('should create vector from another vector', () => {
      const v1 = new Vector2([1, 2]);
      const v2 = new Vector2(v1);
      expect(v2).toBeInstanceOf(Vector2);
      expect(v2).toEqual(new Vector2([1, 2]));
    });
  });

  describe('index access', () => {
    it('should get x and y values', () => {
      const v = new Vector2([1, 2]);
      expect(v.x()).toBe(1);
      expect(v.y()).toBe(2);
    });

    it('should get x and y values using index access', () => {
      const v = new Vector2([1, 2]);
      expect(v[0]).toBe(1);
      expect(v[1]).toBe(2);
    });
  });
});
