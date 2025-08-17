export function angle(vertex, p1, p2) {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  
  const dot = v1.x * v2.x + v1.y * v2.y;
  
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  
  const angleRad = Math.acos(dot / (mag1 * mag2));
  
  return angleRad * (180 / Math.PI);
}

export function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function getTriangleOrientation(p1, p2, p3) {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
}

export function getTextPosition(vertex, p1, p2, offsetDistance = 20) {
  const centerX = (p1.x + p2.x) / 2 - vertex.x;
  const centerY = (p1.y + p2.y) / 2 - vertex.y;
  const length = Math.sqrt(centerX * centerX + centerY * centerY);
  
  return {
    x: vertex.x + (centerX / length) * offsetDistance,
    y: vertex.y + (centerY / length) * offsetDistance
  };
}

export function calculateArcAngles(vertex, p1, p2, triangleOrientation) {
  const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
  const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);
  
  let startAngle = angle1;
  let endAngle = angle2;
  
  let angleDiff = endAngle - startAngle;
  
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
  
  if ((triangleOrientation > 0 && angleDiff < 0) || (triangleOrientation < 0 && angleDiff > 0)) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }
  
  return { startAngle, endAngle };
}