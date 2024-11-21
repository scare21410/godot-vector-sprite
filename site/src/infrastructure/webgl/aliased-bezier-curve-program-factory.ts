import bezierCurveProgramFactory from './bezier-curve-program-factory';

const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_bezier_uv;
    uniform mat4 u_projection;
    varying vec2 v_bezier_uv;

    void main() {
      v_bezier_uv = a_bezier_uv;
      gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
    }
  `;

const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_bezier_uv;
    
    void main() {
      if (v_bezier_uv.x * v_bezier_uv.x - v_bezier_uv.y <= 0.0) {
        gl_FragColor = vec4(62.0/255.0, 142.0/255.0, 204.0/255.0, 1.0); // blue
      } else {
        gl_FragColor = vec4(235.0/255.0, 237.0/255.0, 240.0/255.0, 1.0); // gray
      }
    }
  `;
export default function aliasedBezierCurveProgramFactory(context: WebGL2RenderingContext) {
  return bezierCurveProgramFactory(context, vertexShaderSource, fragmentShaderSource);
}
