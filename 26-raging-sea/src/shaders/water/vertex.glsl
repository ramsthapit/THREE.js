uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Elevation
  float elevation = sin(modelPosition.x * uBigWavesFrequency.x) * 
                    sin(modelPosition.z * uBigWavesFrequency.y) * 
                    uBigWavesElevation;

  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectionPosition;
}