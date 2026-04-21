'use client';
import { useEffect, useRef } from 'react';

// BELIANSKY LOGIC & ORGANIC ENGINE v6.0 - L-CODE GUARDIAN
// Entities: Sinuous worms + Floating logic symbols (brackets, chevrons).
// Features: Soft shadows, prismatic glass, 60fps optimization.
export default function BelianskyMovingMaster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true }); if (!gl) return;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vs = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
    const fs = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      mat2 rot(float a) {
        float s=sin(a), c=cos(a);
        return mat2(c,-s,s,c);
      }

      float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
        vec3 pa = p - a, ba = b - a;
        float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
        return length(pa - ba*h) - r;
      }

      float sdBox(vec3 p, vec3 b) {
        vec3 q = abs(p) - b;
        return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
      }

      // Logic Entity: Bracket { }
      float sdBracket(vec3 p) {
        vec3 q = p;
        float d = sdBox(q, vec3(0.08, 0.8, 0.08)); // Main stem
        d = min(d, sdBox(q - vec3(0.3, 0.8, 0.0), vec3(0.3, 0.08, 0.08))); // Top
        d = min(d, sdBox(q - vec3(0.3, -0.8, 0.0), vec3(0.3, 0.08, 0.08))); // Bottom
        d = min(d, sdBox(q - vec3(0.15, 0.0, 0.0), vec3(0.15, 0.08, 0.08))); // Mid notch
        return d;
      }

      // Logic Entity: Chevron < >
      float sdChevron(vec3 p) {
        p.xy *= rot(0.785); // 45 deg
        float d1 = sdBox(p - vec3(0.4, 0.0, 0.0), vec3(0.4, 0.08, 0.08));
        p.xy *= rot(1.57); // another 90 deg
        float d2 = sdBox(p - vec3(0.4, 0.0, 0.0), vec3(0.4, 0.08, 0.08));
        return min(d1, d2);
      }

      float sdWorm(vec3 p, float tOffset) {
        float t = time * 0.3 + tOffset;
        vec3 a = vec3(sin(t)*5.0, cos(t*0.5)*4.0, sin(t*0.2)*3.0 - 6.0);
        vec3 b = vec3(sin(t+0.6)*5.5, cos((t+0.6)*0.5)*4.5, sin((t+0.6)*0.2)*3.0 - 6.0);
        return sdCapsule(p, a, b, 0.12);
      }

      float map(vec3 p) {
        float t = time * 0.2;
        
        // Worms
        float d = sdWorm(p, 0.0);
        d = min(d, sdWorm(p, 4.0));
        
        // LOGIC 1: Curly Bracket
        vec3 q1 = p - vec3(sin(t)*7.0, cos(t*1.2)*4.0, -8.0);
        q1.xy *= rot(t * 0.5);
        d = min(d, sdBracket(q1));

        // LOGIC 2: Chevron
        vec3 q2 = p - vec3(cos(t*0.8)*6.0, sin(t*0.5)*5.0, -10.0);
        q2.xz *= rot(t);
        d = min(d, sdChevron(q2));

        // Floating Syntax Dots
        vec3 q3 = p - vec3(sin(t*1.5)*3.0, cos(t*1.8)*2.0, -7.0);
        d = min(d, length(q3) - 0.15);

        return d * 0.7;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.y, resolution.x);
        vec3 ro = vec3(0.0, 0.0, -16.0);
        vec3 rd = normalize(vec3(uv, 1.8));
        
        float t = 0.0, shadow = 1.0;
        for(int i=0; i<45; i++) {
          float d = map(ro + rd * t);
          if(d < 0.005 || t > 35.0) break;
          t += d;
          shadow = min(shadow, d * 10.0);
        }
        
        if(t < 35.0) {
          vec3 p = ro + rd * t;
          vec2 e = vec2(0.01, 0.0);
          vec3 n = normalize(vec3(map(p+e.xyy)-map(p-e.xyy), map(p+e.yxy)-map(p-e.yxy), map(p+e.yyx)-map(p-e.yyx)));
          
          float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
          vec3 ref = reflect(rd, n);
          float spec = pow(max(dot(ref, normalize(vec3(1.0,2.0,-3.0))), 0.0), 64.0);
          
          vec3 prismatic = 0.5 + 0.5 * cos(time * 0.05 + p.xyy * 0.2 + vec3(0,2,4));
          vec3 glass = mix(vec3(0.9, 0.92, 1.0), prismatic, fres * 0.5);
          glass += spec * 1.5;
          glass *= clamp(shadow + 0.3, 0.0, 1.0);
          
          gl_FragColor = vec4(glass, (0.15 + fres * 0.6) * clamp(shadow + 0.5, 0.0, 1.0));
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    
    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);

    const tLoc = gl.getUniformLocation(program, "time");
    const rLoc = gl.getUniformLocation(program, "resolution");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    let w = 0, h = 0;
    let animId: number;
    const render = (ts: number) => {
      const c = canvasRef.current; if (!c) return;
      if (c.clientWidth !== w || c.clientHeight !== h) {
        w = c.clientWidth; h = c.clientHeight;
        c.width = w; c.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(tLoc, ts * 0.001);
      gl.uniform2f(rLoc, w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[3] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" style={{background:'transparent'}} />
    </div>
  );
}
// CLEAN_CODE_SWEEP_DONE // L-CODE GUARDIAN
