precision mediump float;

varying float vRandom;

void main()
{
  gl_FragColor = vec4(vRandom, vRandom, 1, 1.0);
}