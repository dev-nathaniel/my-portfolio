precision mediump float;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;
varying float vWave;
uniform float uVelo;
uniform vec3 uMouse;
uniform float uHover;
varying vec3 vPosition;
uniform vec3 uPosition;
uniform float zoom;


float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


void main() {
    
    float vVelo = uVelo;


    // vec3 texture = texture2D(uTexture, vUv).rgb;
    // gl_FragColor = vec4(texture, 1.);
    vec2 uv = gl_FragCoord.xy / vec2(1024, 1024);
    vec2 center = vec2(0.5, 0.5);
    vec2 distance = uv - center;
    float length2 = sqrt(dot(distance, distance));
    vec2 offset = distance * (length2 * uHover - length2);
    float dist = length((uPosition + vPosition) - uMouse);
    float prox = 1. - map( dist, 0., 0.11, 0., 1.);
    prox = clamp(prox, 0., 1.);
    vec2 zoomedUV = mix(vUv, uMouse.xy + vec2(0.5), prox * 0.36);
    // vec4 imgColor = texture2D(uTexture, uv + offset);
    vec4 imgColor = texture2D(uTexture, zoomedUV);
    float gray = dot(imgColor.rgb, vec3(0.299, 0.587, 0.114));
    if(uHover > 0.) {
    gl_FragColor = imgColor;
    }else{     
    gl_FragColor = vec4(vec3(gray), 1.0);
    }
    // gl_FragColor = vec4(vec3(gray), 1.0);

}