import { Editor } from "../main";
import { UserAPI } from "./API";

export const line = () => (start: number, end: number, step: number = 1): number[] => {
  const countPlaces = (num: number) => {
    var text = num.toString();
    var index = text.indexOf(".");
    return index == -1 ? 0 : (text.length - index - 1);
  };

  const result: number[] = [];

  if ((end > start && step > 0) || (end < start && step < 0)) {
    for (let value = start; value <= end; value += step) {
      result.push(value);
    }
  } else if ((end > start && step < 0) || (end < start && step > 0)) {
    for (let value = start; value >= end; value -= step) {
      result.push(parseFloat(value.toFixed(countPlaces(step))));
    }
  } else {
    console.error("Invalid range or step provided.");
  }

  return result;
};

export const sine = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return Math.sin(2 * Math.PI * freq * (app.clock.ctx.currentTime - phase));
};

export const usine = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return ((sine(app)(freq, phase) + 1) / 2);
};

export const saw = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return (((app.clock.ctx.currentTime * freq + phase) % 1) * 2 - 1);
};

export const usaw = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return ((saw(app)(freq, phase) + 1) / 2);
};

export const triangle = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return (Math.abs(saw(app)(freq, phase)) * 2 - 1);
};

export const utriangle = (app: Editor) => (freq: number = 1, phase: number = 0): number => {
  return ((triangle(app)(freq, phase) + 1) / 2);
};

export const square = (app: Editor) => (freq: number = 1, duty: number = 0.5): number => {
  const period = 1 / freq;
  const t = (app.clock.ctx.currentTime % period);
  return (t / period < duty ? 1 : -1);
};

export const usquare = (app: Editor) => (freq: number = 1, duty: number = 0.5): number => {
  return ((square(app)(freq, duty) + 1) / 2);
};

export const noise = (api: UserAPI) => (): number => {
  return (api.randomGen() * 2 - 1); // Assuming randomGen() is defined in the app context
};

export const unoise = (api: UserAPI) => (): number => {
  return ((noise(api)() + 1) / 2);
};
