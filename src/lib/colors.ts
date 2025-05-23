import { Color } from "@/types";

function newColor(color: string, textColor: string): Color {
  return {
    color: `bg-${color}-100`,
    textColor: `text-${textColor}-800`,
    hoverColor: `hover:bg-${color}-200`,
  };
}

const colorPairs = [
  // original
  ["blue", "gray"],
  ["green", "green"],
  ["purple", "purple"],
  ["indigo", "indigo"],
  ["yellow", "yellow"],
  // new
  ["red", "red"],
  ["pink", "pink"],
  ["orange", "orange"],
  ["teal", "teal"],
  ["cyan", "cyan"],
  ["gray", "gray"],
  // ai 
  ["emerald", "emerald"],
  ["sky", "sky"],
  ["violet", "violet"],
  ["slate", "slate"],
  ["rose", "rose"],
  ["amber", "amber"],
  ["lime", "lime"],
  ["fuchsia", "fuchsia"]

];

const colors: Color[] = colorPairs.map(([color, textColor]) => newColor(color, textColor));

// always return the next color in the array, when the array is exhausted, start again from the first color
export function getNextColor(): Color {
  const color = colors.shift() as Color;
  colors.push(color);
  return color;
}
