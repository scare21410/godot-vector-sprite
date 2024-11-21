import bezierCurveProgramFactory from './bezier-curve-program-factory';

const vertexShaderSource = `#version 300 es
    in vec2 a_position;
    in vec2 a_bezier_uv;
    uniform mat4 u_projection;
    out vec2 v_bezier_uv;
    
    void main() {
      v_bezier_uv = a_bezier_uv;
      gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
    }
  `;

const fragmentShaderSource = `#version 300 es
    precision mediump float;
    in vec2 v_bezier_uv;
    out vec4 color;
    
    void main() {
      vec2 dx = dFdx(v_bezier_uv.xy);
      vec2 dy = dFdy(v_bezier_uv.xy);
      float gradX = 2.0 * v_bezier_uv.x * dx.x - dx.y;
      float gradY = 2.0 * v_bezier_uv.x * dy.x - dy.y;
      float CURVE_SD = (v_bezier_uv.x * v_bezier_uv.x - v_bezier_uv.y) / 
        sqrt(gradX * gradX + gradY * gradY);
      float CURVE_ALPHA = clamp(0.5 - CURVE_SD, 0.0, 1.0);
      
      if (CURVE_ALPHA == 0.0) {
        color = vec4(235.0/255.0, 237.0/255.0, 240.0/255.0, 1.0); // gray
      } else if (CURVE_ALPHA == 1.0) {
        color = vec4(62.0/255.0, 142.0/255.0, 204.0/255.0, 1.0); // blue
      } else {
        color = mix(
          vec4(235.0/255.0, 237.0/255.0, 240.0/255.0, 1.0),
          vec4(62.0/255.0, 142.0/255.0, 204.0/255.0, 1.0), 
          CURVE_ALPHA
        );
      }
    }
  `;
export default function antialiasedBezierCurveProgramFactory(
  context: WebGL2RenderingContext,
) {
  return bezierCurveProgramFactory(
    context,
    vertexShaderSource,
    fragmentShaderSource,
  );
}
