import React, { useEffect, useRef, useState } from 'react';
import calculateProjectionMatrix from '../../application/matrix/calculate-projection-matrix';

type ProgramContext = {
  program: WebGLProgram;
  triangleDataVertexArray: WebGLVertexArrayObject;
  projectionMatrixLocation: WebGLUniformLocation;
};

type ProgramFactory = (gl: WebGL2RenderingContext) => WebGLProgram;

function setupScene(
  canvas: HTMLCanvasElement,
  programFactory: ProgramFactory,
): ProgramContext | undefined {
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    return;
  }
  const program = programFactory(gl);

  // position buffer
  const trianglePositionsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionsBuffer);
  const positions = [20, 180, 180, 20, 180, 180];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // bezier uv buffer
  const triangleUvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleUvBuffer);
  const uvData = [0, 0, 0.5, 0, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW);

  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const bezierUvAttributeLocation = gl.getAttribLocation(
    program,
    'a_bezier_uv',
  );

  // bind all data buffers to vertex array
  const triangleDataVertexArray = gl.createVertexArray();
  if (!triangleDataVertexArray) {
    return;
  }
  gl.bindVertexArray(triangleDataVertexArray);

  gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionsBuffer);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, triangleUvBuffer);
  gl.enableVertexAttribArray(bezierUvAttributeLocation);
  gl.vertexAttribPointer(bezierUvAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);

  const projectionMatrixLocation = gl.getUniformLocation(
    program,
    'u_projection',
  );
  if (!projectionMatrixLocation) {
    return;
  }

  return {
    program,
    triangleDataVertexArray,
    projectionMatrixLocation,
  };
}

function drawScene(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  projection: number[],
  context: ProgramContext,
) {
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    return;
  }

  gl.viewport(0, 0, width, height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(context.program);
  gl.bindVertexArray(context.triangleDataVertexArray);
  gl.uniformMatrix4fv(
    context.projectionMatrixLocation,
    false,
    // prettier-ignore
    new Float32Array(projection),
  );
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

type Props = {
  width: number;
  height: number;
  programFactory: ProgramFactory;
  viewBox?: [number, number, number, number];
  className?: string;
};

export default function GpuBezierCurveTriangle({
  width,
  height,
  programFactory,
  viewBox,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [programContext, setProgramContext] = useState<
    ProgramContext | undefined
  >(undefined);
  const projection = calculateProjectionMatrix(width, height, viewBox);

  useEffect(() => {
    if (canvasRef.current) {
      setProgramContext(setupScene(canvasRef.current, programFactory));
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (canvasRef.current && programContext) {
      drawScene(canvasRef.current, width, height, projection, programContext);
    }
  }, [canvasRef.current, width, height, programContext]);

  return (
    <canvas
      className={className}
      width={width}
      height={height}
      ref={canvasRef}
    />
  );
}
