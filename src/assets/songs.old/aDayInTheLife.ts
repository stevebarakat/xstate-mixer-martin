import { Song } from "../../types/songs";

export const aDayInTheLife: Song = {
  title: "A Day In The Life",
  slug: "a-day-in-the-life",
  artist: "The Beatles",
  year: "1967",
  studio: "Abby Road",
  location: "London, England",
  bpm: 79,
  start: 0.5,
  end: 267,
  tracks: [
    {
      id: crypto.randomUUID(),
      name: "Bass/Drums",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/bass-drums.mp3",
      volume: -32,
      pan: 0,
      mute: false,
      solo: false,
      fxName: ["nofx", "nofx"],
      sends: [false, false],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
    },
    {
      id: crypto.randomUUID(),
      name: "Instruments",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/instruments.mp3",
      volume: -32,
      pan: 0,
      mute: false,
      solo: false,
      fxName: ["nofx", "nofx"],
      sends: [false, false],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
    },
    {
      id: crypto.randomUUID(),
      name: "Orchestra",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/orchestra.mp3",
      volume: -32,
      pan: 0,
      mute: false,
      solo: false,
      fxName: ["nofx", "nofx"],
      sends: [false, false],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
    },
    {
      id: crypto.randomUUID(),
      name: "Vocals",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/aDayInTheLife/vox.mp3",
      volume: -32,
      pan: 0,
      mute: false,
      solo: false,
      fxName: ["nofx", "nofx"],
      sends: [false, false],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
    },
  ],
  buses: [
    {
      id: crypto.randomUUID(),
      name: "Bus 1",
      volume: 0.61,
      fxName: ["nofx", "nofx"],
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
    },
    {
      id: crypto.randomUUID(),
      name: "Bus 2",
      volume: 0.61,
      fxName: ["nofx", "nofx"],
      reverbMix: [0.5, 0.5],
      reverbPreDelay: [0.5, 0.5],
      reverbDecay: [0.5, 0.5],
      reverbBypass: [false, false],
      delayMix: [0.5, 0.5],
      delayTime: [1, 1],
      delayFeedback: [0.5, 0.5],
      delayBypass: [false, false],
      pitchShiftBypass: [false, false],
      pitchShiftMix: [0.5, 0.5],
      pitchShiftPitch: [5, 5],
      panelPosition: { x: 0, y: 0 },
      panelSize: { width: "325px", height: "auto" },
    },
  ],
};