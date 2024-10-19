import { expect, describe, it } from 'bun:test';
import M3x3 from './m3x3';
import Vector3 from '../vector/vector3';

describe('M3x3', () => {
  describe('constructor', () => {
    it('should create identity matrix', () => {
      const m = M3x3.identity();
      expect(m).toBeInstanceOf(M3x3);
      expect(m).toEqual(new M3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]));
    });

    it('should create zero matrix', () => {
      const m = M3x3.zero();
      expect(m).toBeInstanceOf(M3x3);
      expect(m).toEqual(new M3x3([0, 0, 0, 0, 0, 0, 0, 0, 0]));
    });

    it('should create matrix from array', () => {
      const m = new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(m).toBeInstanceOf(M3x3);
      expect(m).toEqual(new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    it('should create matrix from Float32Array', () => {
      const m = new M3x3(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      expect(m).toBeInstanceOf(M3x3);
      expect(m).toEqual(new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    it('should create matrix from another matrix', () => {
      const m1 = new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const m2 = new M3x3(m1);
      expect(m2).toBeInstanceOf(M3x3);
      expect(m2).toEqual(new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    it('should create matrix from Vector3 array', () => {
      const m = new M3x3([
        new Vector3([1, 2, 3]),
        new Vector3([4, 5, 6]),
        new Vector3([7, 8, 9]),
      ]);
      expect(m).toBeInstanceOf(M3x3);
      expect(m).toEqual(new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

    it('should throw error for invalid data type', () => {
      expect(() => new M3x3(1 as any)).toThrow(TypeError);
      expect(() => new M3x3([])).toThrow(TypeError);
      expect(() => new M3x3([1, 2, 3])).toThrow(TypeError);
      expect(() => new M3x3([new Vector3([1, 2, 3])])).toThrow(TypeError);
    });
  });

  describe('index access', () => {
    it('should get row vector', () => {
      const m = new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(m[0]).toEqual(new Vector3([1, 2, 3]));
      expect(m[1]).toEqual(new Vector3([4, 5, 6]));
      expect(m[2]).toEqual(new Vector3([7, 8, 9]));
    });
  });

  describe('transpose', () => {
    it('should transpose matrix', () => {
      const m = new M3x3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const t = m.transpose();
      expect(t).toBeInstanceOf(M3x3);
      expect(t).toEqual(new M3x3([1, 4, 7, 2, 5, 8, 3, 6, 9]));
    });
  });
});
