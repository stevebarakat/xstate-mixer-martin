import { MixerContext } from "../contexts/MixerContext";
import Fader from "./Fader";
import { Toggle } from "./Buttons";

export function Volume({ trackId }: { trackId: number }) {
  const { send } = MixerContext.useActorRef();
  const volume = MixerContext.useSelector(
    // Volume object is mutated when changing volume
    // Select the current volume value for a warranted change detection
    (state) => state.context.channels![trackId].volume.value ?? 0
  );
  const state = MixerContext.useSelector((state) => state);
  const currentSong = state.context.currentSong;

  const name = currentSong?.tracks[trackId].name;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div className="channel">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label
            htmlFor={trackId.toString()}
            style={{ alignSelf: "flex-start" }}
          >
            Volume
          </label>
          <Fader trackId={trackId} />
          <input
            id={trackId.toString()}
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
        <div className="solo-mute">
          <Toggle
            id={`trackSolo${currentSong?.tracks[trackId].id}`}
            onChange={() => send({ type: "volume.solo", trackId })}
          >
            S
          </Toggle>
          <Toggle
            id={`trackMute${currentSong?.tracks[trackId].id}`}
            onChange={() => send({ type: "volume.mute", trackId })}
          >
            M
          </Toggle>
        </div>
        <span>{name}</span>
      </div>
    </div>
  );
}
