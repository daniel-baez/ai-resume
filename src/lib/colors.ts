import { Color } from "@/types";

function newColor(color: string, textColor: string): Color {
  return {
    color: `bg-${color}-100`,
    textColor: `text-${textColor}-800`,
    hoverColor: `hover:bg-${color}-200`,
  };
}

const colorPairs = [
  ["blue", "gray"],
  ["green", "green"],
  ["purple", "purple"],
  ["indigo", "indigo"],
  ["yellow", "yellow"],
  ["red", "red"],

];

const colors: Color[] = colorPairs.map(([color, textColor]) => newColor(color, textColor));

// always return the next color in the array, when the array is exhausted, start again from the first color
export function getNextColor(): Color {
  const color = colors.shift() as Color;
  colors.push(color);
  return color;
}
