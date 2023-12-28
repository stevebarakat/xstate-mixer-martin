import React from "react";
import { MixerContext } from "../contexts/MixerContext";
import { Toggle } from "./Buttons";

export function Volume({ trackId }: { trackId: number }) {
  const { send } = MixerContext.useActorRef();
  const volume = MixerContext.useSelector(
    // Volume object is mutated when changing volume
    // Select the current volume value for a warranted change detection
    (state) => state.context.channels![trackId].volume.value ?? 0
  );
  const state = MixerContext.useSelector((state) => state);

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
      <div className="channel">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor={inputId}>Volume</label>
          <input
            id={inputId}
            className="range-y"
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
            id={`trackSolo${state.context.currentSong?.tracks[trackId].id}`}
            onChange={() => send({ type: "volume.solo", trackId })}
          >
            S
          </Toggle>
          <Toggle
            id={`trackMute${state.context.currentSong?.tracks[trackId].id}`}
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
