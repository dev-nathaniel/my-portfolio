precision mediump float;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;
varying float vWave;

void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture,1.);
}