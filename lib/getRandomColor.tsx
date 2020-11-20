const colorMap = {
  green: "green",
  red: "red",
  indigo: "indigo",
  purple: "purple",
  pink: "pink",
  gray: "gray",
};

const colors = Object.keys(colorMap);
export type Color = keyof typeof colorMap;

export const getRandomColor = (): Color => {
  const colorIndex = Math.floor(Math.random() * colors.length);
  return colors[colorIndex] as Color;
};
