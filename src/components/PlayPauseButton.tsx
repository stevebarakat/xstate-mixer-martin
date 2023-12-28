import { MixerContext } from "../contexts/MixerContext";

export function PlayPauseButton() {
  const canPause = MixerContext.useSelector((state) =>
    // Dirty hack which to determine which button to display
    state.can({ type: "song.pause" })
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
      {canPause ? "Pause" : "Play"}
    </button>
  );
}
