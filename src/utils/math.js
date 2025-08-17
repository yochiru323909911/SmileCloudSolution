// חישוב זווית במשולש בין שלוש נקודות
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