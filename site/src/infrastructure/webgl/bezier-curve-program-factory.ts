export default function bezierCurveProgramFactory(
  context: WebGL2RenderingContext,
): WebGLProgram {
  const vertexShader = context.createShader(context.VERTEX_SHADER);
  const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) {
    throw new Error('Failed to create shaders');
  }
  context.shaderSource(
    vertexShader,
    `
    attribute vec2 a_position;
    attribute vec2 a_bezier_uv;
    uniform mat4 u_projection;
    
    varying vec2 v_bezier_uv;

    
    void main() {
      v_bezier_uv = a_bezier_uv;
      gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
    }
  `,
  );
  context.compileShader(vertexShader);
  if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
    const error = context.getShaderInfoLog(vertexShader);
    throw new Error(error ? error : 'Failed to compile vertex shader');
  }

  context.shaderSource(
    fragmentShader,
    `
    precision mediump float;
    varying vec2 v_bezier_uv;
    
    void main() {
      gl_FragColor = vec4(62.0/255.0, 142.0/255.0, 204.0/255.0, 1.0);
      if (v_bezier_uv.x * v_bezier_uv.x - v_bezier_uv.y >= 0.0) {
        discard;
      }
    }
  `,
  );
  context.compileShader(fragmentShader);
  if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
    const error = context.getShaderInfoLog(fragmentShader);
    throw new Error(error ? error : 'Failed to compile fragment shader');
  }

  const program = context.createProgram();
  if (!program) {
    throw new Error('Failed to create program');
  }

  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);
  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    const error = context.getProgramInfoLog(program);
    throw new Error(error ? error : 'Failed to link program');
  }

  return program;
}
