import { MixerContext } from "../contexts/MixerContext";

export function PlayPauseButton() {
  const isPlaying = MixerContext.useSelector((state) =>
    // Can also check for `state.matches({ song: { loaded: "playing" } })`,
    // but this method is more stable with state hierarchy changes
    state.hasTag("playing")
  );
  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.playPause" })
  );
  const { send } = MixerContext.useActorRef();

  return (
    <button
      onClick={() => send({ type: "song.playPause" })}
      disabled={disabled}
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}
