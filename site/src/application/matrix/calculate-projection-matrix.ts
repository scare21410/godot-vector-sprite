export default function calculateProjectionMatrix(
  width: number,
  height: number,
  viewBox?: [number, number, number, number],
) {
  const [minX, minY, boxW, boxH] = viewBox ?? [0, 0, width, height];
  const scaleX = 2.0 / boxW;
  const scaleY = -2.0 / boxH;
  const translateX = -1 - minX * scaleX;
  const translateY = 1 - minY * scaleY;
  // prettier-ignore
  return [
    scaleX, 0, 0, 0,
    0, scaleY, 0, 0,
    0, 0, 1, 0,
    translateX, translateY, 0, 1,
  ];
}
