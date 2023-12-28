import { MixerContext } from "../contexts/MixerContext";

export function Volume({ trackId }: { trackId: number }) {
  const { send } = MixerContext.useActorRef();
  const volume = MixerContext.useSelector(
    // Volume object is mutated when changing volume
    // Select the current volume value for a warranted change detection
    (state) => state.context.channels![trackId].volume.value ?? 0
  );
  const mute = MixerContext.useSelector(
    // Player object is mutated when toggling mute.
    // We select the mute value for a warranted change detection
    (state) => state.context.channels![trackId].muted ?? false
  );
  const state = MixerContext.useSelector((state) => state);
  console.log("state.context.currentSong", state.context.currentSong);
  const name = MixerContext.useSelector(
    (state) => state.context.currentSong?.tracks[trackId].name
  );

  const inputId = `volume-${trackId}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h2>{name}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor={inputId} style={{ alignSelf: "flex-start" }}>
          Volume
        </label>
        <input
          id={inputId}
          // Careful with this, changing the channel value elsewhere won't be reflected here.
          // Workaround is to use the value attribute instead,
          // but you have to handle the incoming -Infinity value when muting the song.
          defaultValue={volume.toFixed()}
          min={-50}
          max={0}
          type="range"
          onChange={(event) => {
            const value = Number.parseInt(event.target.value);
            send({ type: "volume.set", trackId, value });
          }}
        />
      </div>
      <button onClick={() => send({ type: "volume.mute", trackId })}>
        {mute ? "Muted" : "Mute"}
      </button>
    </div>
  );
}
