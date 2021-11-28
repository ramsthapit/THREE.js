void main()
{
  // Disc
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 -  step(0.5, strength);

  gl_FragColor = vec4(vec3(strength), 1.0);
}