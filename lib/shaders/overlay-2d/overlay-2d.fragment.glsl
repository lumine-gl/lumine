uniform sampler2D t0;
uniform sampler2D t1;

uniform vec2 cUv0;
uniform vec2 cUv1;
uniform vec2 oUv0;
uniform vec2 oUv1;

varying vec2 vUv;

void main() {

  vec4 texel0 = texture2D( t0, oUv0 + vUv * cUv0 );
  vec4 texel1 = texture2D( t1, oUv1 + vUv * cUv1 );

  gl_FragColor = vec4(mix(texel0.rgb, texel1.rgb, texel1.a), texel0.a);

}