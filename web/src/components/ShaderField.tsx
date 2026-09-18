import { useEffect, useRef, useState } from "react";
import { createShaderProgram } from "../lib/createShaderProgram.js";
import { drawShaderFrame } from "../lib/drawShaderFrame.js";

export function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (gl === null) {
      setHasFailed(true);
      return;
    }
    const program = createShaderProgram(gl);
    if (program === null) {
      setHasFailed(true);
      return;
    }
    gl.useProgram(program);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      scroll: gl.getUniformLocation(program, "u_scroll"),
    };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (still) {
      const redraw = () => drawShaderFrame(canvas, gl, uniforms, 6);
      redraw();
      window.addEventListener("scroll", redraw, { passive: true });
      window.addEventListener("resize", redraw);
      return () => {
        window.removeEventListener("scroll", redraw);
        window.removeEventListener("resize", redraw);
      };
    }

    let running = true;
    let handle = 0;
    const start = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      drawShaderFrame(canvas, gl, uniforms, (now - start) / 1000);
      handle = requestAnimationFrame(loop);
    };
    handle = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(handle);
        return;
      }
      if (!running) {
        running = true;
        handle = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(handle);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (hasFailed) return <div className="fieldFallback" aria-hidden="true" />;
  return <canvas className="field" ref={canvasRef} aria-hidden="true" />;
}
