import type {
  FeedbackDelay,
  PitchShift,
  Reverb,
  Volume,
  Channel as ToneChannel,
} from "tone";
import type { Destination as ToneDestination } from "tone/build/esm/core/context/Destination";
import { Transport as ToneTransport } from "tone/build/esm/core/clock/Transport";
import { TrackSettings as TS } from "@/App";
import { defaultTrackData } from "@/assets/songs/defaultData";

declare global {
  type Destination = ToneDestination;
  type Transport = ToneTransport;
  type Channel = ToneChannel;
  type DefaultTrackData = typeof defaultTrackData;

  type Fx = Volume | Reverb | FeedbackDelay | PitchShift;

  type InitialConext = {
    song: DefaultSongData;
    channels: Channel[] | [];
    t: Transport;
    currentTime: string;
    volume: number;
    currentTracks: TrackSettings[];
  };

  type TrackFx = {
    nofx: Volume | null;
    reverb: Reverb | null;
    delay: FeedbackDelay | null;
    pitchShift: PitchShift | null;
  };

  type DefaultSongData = {
    id: string;
    slug: string;
    title: string;
    artist: string;
    year: string;
    studio: string;
    location: string;
    bpm: number;
    start: number;
    end: number;
    tracks?: SourceTrack[];
  };

  type SourceSong = DefaultSongData | DefaultTrackData;

  type SourceTrack = {
    id: string;
    name: string;
    path: string;
  };

  type SoloMuteType = {
    solo: boolean;
    mute: boolean;
  };

  type TrackSettings = TS;

  // type TrackSettings = {
  //   id: string;
  //   name: string;
  //   path: string;
  //   songSlug: string;

  //   // MAIN
  //   volume: number;
  //   volumeMode: string;
  //   pan: number;
  //   panMode: string;
  //   soloMute: { solo: boolean; mute: boolean };
  //   soloMuteMode: string;

  //   // FX
  //   fxNames: string[];
  //   delaySettings: DelaySettings;
  //   reverbSettings: ReverbSettings;
  //   pitchShiftSettings: PitchShiftSettings;

  //   // PANELS
  //   panelPosition: { x: number; y: number };
  //   panelSize: { width: string; height: string };
  //   panelActive: boolean;
  // };

  type DelaySettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    delayTime: number | undefined;
    feedback: number | undefined;
  };

  type ReverbSettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    preDelay: number | undefined;
    decay: number | undefined;
  };

  type PitchShiftSettings = {
    playbackMode: string | undefined;
    bypassed: boolean | undefined;
    mix: number | undefined;
    pitch: number | undefined;
  };
}
