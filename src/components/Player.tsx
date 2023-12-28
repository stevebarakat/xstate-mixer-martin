import React from "react";
import { MixerContext } from "../contexts/MixerContext";
import { Volume } from "./Volume";

export function Players() {
  const tracks = MixerContext.useSelector(
    (state) => state.context.currentSong?.tracks
  );

  if (!tracks) return null;

  return (
    <div className="channels">
      {tracks.map((track, trackId) => (
        <Volume key={track.id} trackId={trackId} />
      ))}
    </div>
  );
}
