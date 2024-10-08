export function getShapeStyle(style) {
  const result = {};
  ["width", "height", "top", "left", "rotate"].forEach((attr) => {
    if (attr != "rotate") {
      result[attr] = `${style[attr]}px`;
    } else {
      result.transform = `rotate(${style[attr]}deg)`;
    }
  });

  return result;
}
