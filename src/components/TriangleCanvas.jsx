import React, { useEffect, useRef } from "react";
import { angle, getTriangleOrientation, getTextPosition, calculateArcAngles } from "../utils/math";

export default function TriangleCanvas({ points }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!points || points.length < 3) return;
    const [p1, p2, p3] = points;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 800, 800);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2563eb";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "#dc2626";
    [p1, p2, p3].forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    const angleA = angle(p1, p2, p3);
    const angleB = angle(p2, p1, p3);
    const angleC = angle(p3, p1, p2);

    const triangleOrientation = getTriangleOrientation(p1, p2, p3);

    const drawAngleArc = (vertex, p1, p2, radius = 30) => {
      const { startAngle, endAngle } = calculateArcAngles(vertex, p1, p2, triangleOrientation);
      
      ctx.strokeStyle = "#16a34a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(vertex.x, vertex.y, radius, startAngle, endAngle);
      ctx.stroke();
    };

    drawAngleArc(p1, p2, p3);
    drawAngleArc(p2, p1, p3);
    drawAngleArc(p3, p1, p2);

    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#1f2937";
    
    const pos1 = getTextPosition(p1, p2, p3);
    const pos2 = getTextPosition(p2, p1, p3);
    const pos3 = getTextPosition(p3, p1, p2);

    ctx.fillText(`${angleA.toFixed(1)}°`, pos1.x, pos1.y);
    ctx.fillText(`${angleB.toFixed(1)}°`, pos2.x, pos2.y);
    ctx.fillText(`${angleC.toFixed(1)}°`, pos3.x, pos3.y);

    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#dc2626";
    ctx.fillText("A", p1.x + 8, p1.y - 8);
    ctx.fillText("B", p2.x + 8, p2.y - 8);
    ctx.fillText("C", p3.x + 8, p3.y - 8);

  }, [points]);

  return (
    <div className="flex flex-col items-center">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={800} 
        className="border-2 border-gray-300 rounded-lg shadow-lg bg-white"
      />
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>המשולש מוצג עם סימון הזוויות בקווים ירוקים</p>
        <p>הנקודות מסומנות באדום עם תוויות A, B, C</p>
      </div>
    </div>
  );
}