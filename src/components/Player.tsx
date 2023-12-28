import { MixerContext } from "../contexts/MixerContext";
import { Volume } from "./Volume";

export function Players() {
  const tracks = MixerContext.useSelector(
    (state) => state.context.currentSong?.tracks
  );

  if (!tracks) return null;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {tracks.map((track) => (
        <Volume key={track.id} playerId={track.id} />
      ))}
    </div>
  );
}