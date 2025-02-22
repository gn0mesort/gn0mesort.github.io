'use strict';

function main() {
    const canvas = document.getElementById('cube-context');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        return;
    }
    canvas.classList.remove('hide');
    const vertexShaderSrc = `#version 300 es
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

in vec3 vtx_position;
in vec3 vtx_normal;
in vec3 vtx_color;

out vec3 frg_position;
out vec3 frg_normal;
out vec3 frg_color;

void main() {
   frg_position = vec3(model * vec4(vtx_position, 1.0));
   frg_normal = mat3(transpose(inverse(model))) * vtx_normal;
   gl_Position = projection * view * vec4(frg_position, 1.0);
   frg_color = vtx_color;
}
`;
    const fragmentShaderSrc = `#version 300 es
precision highp float;

const vec3 light_position = vec3(1.2, 1.0, 2.0);
const vec3 light_color = vec3(1.0, 1.0, 1.0);

in vec3 frg_position;
in vec3 frg_normal;
in vec3 frg_color;

out vec4 final_color;

float gamma(float channel) {
  if (channel <= 0.0031308)
  {
    return 12.92 * channel;
  }
  return pow(channel, 1.0 / 2.4) - 0.055;
}

vec3 gamma(vec3 color) {
  return vec3(gamma(color.r), gamma(color.g), gamma(color.b));
}

void main() {
  vec3 ambient = 0.1 * light_color;
  vec3 light_direction = normalize(light_position - frg_position);
  vec3 normal = normalize(frg_normal);
  vec3 diffuse = max(dot(normal, light_direction), 0.0) * light_color;
  vec3 view_direction = normalize(vec3(0, 0, 2.0) - frg_position);
  vec3 reflect_direction = reflect(-light_direction, normal);
  vec3 specular = 0.5 * pow(max(dot(view_direction, reflect_direction), 0.0), 32.0) *
                  light_color;
  vec3 result = specular + diffuse + ambient;

  final_color = vec4(gamma(result * frg_color), 1.0);
}
`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    console.log(gl.getShaderInfoLog(vertexShader));
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    console.log(gl.getShaderInfoLog(fragmentShader));
    const graphicsProgram = gl.createProgram();
    gl.attachShader(graphicsProgram, vertexShader);
    gl.attachShader(graphicsProgram, fragmentShader);
    gl.linkProgram(graphicsProgram);
    const modelUni = gl.getUniformLocation(graphicsProgram, 'model');
    const viewUni = gl.getUniformLocation(graphicsProgram, 'view');
    const projectionUni = gl.getUniformLocation(graphicsProgram,'projection');
    const positionAttr = gl.getAttribLocation(graphicsProgram, 'vtx_position');
    const normalAttr = gl.getAttribLocation(graphicsProgram, 'vtx_normal');
    const colorAttr = gl.getAttribLocation(graphicsProgram, 'vtx_color');

    const vertices = [
        -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,
        0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,
        0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,
        -0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,
        -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0, 0.0, 0.0,

        -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,
        0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,
        0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,
        0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0, 1.0, 0.0,

        -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,
        -0.5,  0.5, -0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,
        -0.5, -0.5,  0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,
        -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  0.0, 0.0, 1.0,

        0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,
        0.5,  0.5, -0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,
        0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,
        0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,
        0.5, -0.5,  0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,
        0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0, 0.0, 1.0,

        -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,
        0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,
        0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,
        0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,
        -0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0, 1.0, 0.0,

        -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
        0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
        0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
        0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
        -0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
        -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0, 1.0, 1.0,
    ];

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 3, gl.FLOAT, false, 36, 0);
    gl.enableVertexAttribArray(normalAttr);
    gl.vertexAttribPointer(normalAttr, 3, gl.FLOAT, false, 36, 12)
    gl.enableVertexAttribArray(colorAttr);
    gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, false, 36, 24);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);

    const projection = glm.perspective(glm.radians(90.0), 4.0 / 3.0, 0.1, 100.0).elements;
    const cameraPos = glm.vec3([0, 0, 2]);
    const cameraUp = glm.vec3([0, 1, 0]);
    const view = glm.lookAt(cameraPos, glm.vec3(), cameraUp).elements;
    let model = glm.mat4();
    let last = performance.now();
    let dt = 0;

    const drawScene = () => {
        gl.bindVertexArray(vao);
        gl.useProgram(graphicsProgram);
        gl.uniformMatrix4fv(projectionUni, false, projection);
        gl.uniformMatrix4fv(viewUni, false, view);
        model = glm.rotate(model, glm.radians(30.0) * dt, glm.vec3(1.0, 0.0, 0.0));
        model = glm.rotate(model, glm.radians(30.0) * dt, glm.vec3(0.0, 1.0, 0.0));
        gl.uniformMatrix4fv(modelUni, false, model.elements);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 9);
        requestAnimationFrame(drawScene);
        dt = (performance.now() - last) / 1000;
        last = performance.now();
    };
    requestAnimationFrame(drawScene);
}

main();
