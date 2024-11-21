export default function bezierCurveProgramFactory(
  context: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string,
): WebGLProgram {
  const vertexShader = context.createShader(context.VERTEX_SHADER);
  const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) {
    throw new Error('Failed to create shaders');
  }
  context.shaderSource(vertexShader, vertexShaderSource);
  context.compileShader(vertexShader);
  if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
    const error = context.getShaderInfoLog(vertexShader);
    throw new Error(error ? error : 'Failed to compile vertex shader');
  }

  context.shaderSource(fragmentShader, fragmentShaderSource);
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
