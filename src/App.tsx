import "./App.css";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Players } from "./components/Player";
import { SongLoading } from "./components/SongLoading";
import { SongSelector } from "./components/SongSelector";
import { StopButton } from "./components/StopButton";
import { MixerContext } from "./contexts/MixerContext";

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
