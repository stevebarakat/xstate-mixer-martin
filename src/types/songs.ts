export type Song = {
  title: string;
  slug: string;
  artist: string;
  year: string;
  studio: string;
  location: string;
  bpm: number;
  start: number;
  end: number;
  tracks: Track[];
  buses: Bus[];
};

export type Bus = {
  id: string;
  name: string;
  volume: number;
  fxName: [string, string];
  reverbMix: [number, number];
  reverbPreDelay: [number, number];
  reverbDecay: [number, number];
  reverbBypass: [boolean, boolean];
  delayMix: [number, number];
  delayTime: [number, number];
  delayFeedback: [number, number];
  delayBypass: [boolean, boolean];
  pitchShiftBypass: [boolean, boolean];
  pitchShiftMix: [number, number];
  pitchShiftPitch: [number, number];
  panelPosition: { x: number; y: number };
  panelSize: { width: string | number; height: string | number };
};

export type Track = {
  id: string;
  name: string;
  path: string;
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  fxName: [string, string];
  sends: [boolean, boolean];
  panelPosition: { x: number; y: number };
  panelSize: { width: string | number; height: string | number };
  reverbMix: [number, number];
  reverbPreDelay: [number, number];
  reverbDecay: [number, number];
  reverbBypass: [boolean, boolean];
  delayMix: [number, number];
  delayTime: [number, number];
  delayFeedback: [number, number];
  delayBypass: [boolean, boolean];
  pitchShiftBypass: [boolean, boolean];
  pitchShiftMix: [number, number];
  pitchShiftPitch: [number, number];
};
