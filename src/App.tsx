import { Meter } from "tone";
import "./App.css";
import { defaultTrackData } from "./assets/songs/defaultData";
import { roxanne } from "./assets/songs/roxanne";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Players } from "./components/Player";
import { SongLoading } from "./components/SongLoading";
import { SongSelector } from "./components/SongSelector";
import { StopButton } from "./components/StopButton";
import { MixerContext } from "./contexts/MixerContext";
import React from "react";

const sourceSong = roxanne;

const currentMain = {
  volume: -32,
  meter: new Meter(),
  meterVals: new Float32Array(),
};

const currentTracks = sourceSong.tracks.map((track) => ({
  ...track,
  ...defaultTrackData,
  sourceSongSlug: sourceSong.slug,
}));

const initialContext = { sourceSong, currentMain, currentTracks };
export type InitialContext = typeof initialContext;
export type TrackSettings = typeof currentTracks;

function App() {
  // TODO: Set current song in options from local storage data
  return (
    <MixerContext.Provider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SongSelector />
        <SongLoading />
        <div style={{ paddingTop: 24, display: "flex", gap: 8 }}>
          <PlayPauseButton />
          <StopButton />
        </div>
        <Players />
      </div>
    </MixerContext.Provider>
  );
}

export default App;
