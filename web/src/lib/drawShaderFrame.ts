export interface ShaderUniforms {
  resolution: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  scroll: WebGLUniformLocation | null;
}

export function drawShaderFrame(
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  uniforms: ShaderUniforms,
  seconds: number,
): void {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
  const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
  gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
  gl.uniform1f(uniforms.time, seconds);
  gl.uniform1f(uniforms.scroll, window.scrollY / (window.innerHeight || 1));
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
