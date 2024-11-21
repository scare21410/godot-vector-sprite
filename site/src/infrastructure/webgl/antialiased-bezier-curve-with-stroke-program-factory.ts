import bezierCurveProgramFactory from './bezier-curve-program-factory';

const vertexShaderSource = `#version 300 es
    in vec2 a_position;
    in vec2 a_bezier_uv;
    uniform mat4 u_projection;
    out vec2 v_bezier_uv;
    out vec2 v_position;
    
    void main() {
      v_bezier_uv = a_bezier_uv;
      v_position = a_position;
      gl_Position = u_projection * vec4(a_position, 0.0, 1.0);
    }
  `;

const fragmentShaderSource = `#version 300 es
    precision mediump float;
    in vec2 v_bezier_uv;
    in vec2 v_position;
    out vec4 color;
    
    void main() {
      vec2 dx = dFdx(v_bezier_uv.xy);
      vec2 dy = dFdy(v_bezier_uv.xy);
      float gradX = 2.0 * v_bezier_uv.x * dx.x - dx.y;
      float gradY = 2.0 * v_bezier_uv.x * dy.x - dy.y;
      float CURVE_SD = (v_bezier_uv.x * v_bezier_uv.x - v_bezier_uv.y) / 
        sqrt(gradX * gradX + gradY * gradY);
      float scale = 0.5 * (length(dFdx(v_position.xy)) + length(dFdy(v_position.xy)));
        
      float CURVE_ALPHA = clamp(0.5 - CURVE_SD, 0.0, 1.0);
      float STROKE_WIDTH = 10.0 / scale;
      float STROKE_SD_INNER = CURVE_SD + STROKE_WIDTH / 2.0;
      float STROKE_SD_OUTER = CURVE_SD - STROKE_WIDTH / 2.0;
      float STROKE_ALPHA_INNER = clamp(-0.5 + STROKE_SD_INNER, 0.0, 1.0);
      float STROKE_ALPHA_OUTER = clamp(0.5 - STROKE_SD_OUTER, 0.0, 1.0);
      if (STROKE_ALPHA_INNER > 0.0 && STROKE_ALPHA_OUTER > 0.0) {
        color = mix(
          vec4(62.0/255.0, 142.0/255.0, 204.0/255.0, 1.0), // blue
          mix(
            vec4(235.0/255.0, 237.0/255.0, 240.0/255.0, 1.0), // gray
            vec4(0.0, 0.0, 0.0, 1.0),
            STROKE_ALPHA_OUTER
          ),
          STROKE_ALPHA_INNER
        );
      } else if (CURVE_ALPHA == 0.0) {
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
export default function antialiasedBezierCurveWithStrokeProgramFactory(
  context: WebGL2RenderingContext,
) {
  return bezierCurveProgramFactory(
    context,
    vertexShaderSource,
    fragmentShaderSource,
  );
}
