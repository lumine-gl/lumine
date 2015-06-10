uniform sampler2D t0;
uniform sampler2D t1;

varying vec2 vUv;

void main() {

  vec4 texel0 = texture2D( t0, vUv );
  vec4 texel1 = texture2D( t1, vUv );

  gl_FragColor = min(texel0 + texel1, vec4(1.0, 1.0, 1.0, 1.0));

}