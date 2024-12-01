precision mediump float;
varying vec2 vTextureCoord;
varying vec3 vVertexPosition;
uniform sampler2D uSampler0;

void main() {
    vec3 texture = texture2D(uSampler0, vTextureCoord).rgb;
    gl_FragColor = vec4(texture,1.);
}