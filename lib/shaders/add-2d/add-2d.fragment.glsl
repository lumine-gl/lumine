uniform sampler2D t0;
uniform sampler2D t1;

uniform vec2 cUv0;
uniform vec2 cUv1;

varying vec2 vUv;

void main() {

  vec4 texel0 = texture2D( t0, vUv * cUv0 );
  vec4 texel1 = texture2D( t1, vUv * cUv1 );

  gl_FragColor = min(texel0 + texel1, vec4(1.0, 1.0, 1.0, 1.0));

}