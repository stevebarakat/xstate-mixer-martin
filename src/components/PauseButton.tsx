import { MixerContext } from "../contexts/MixerContext";

export function PauseButton() {
  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.pause" })
  );
  const { send } = MixerContext.useActorRef();

  return (
    <button onClick={() => send({ type: "song.pause" })} disabled={disabled}>
      Pause
    </button>
  );
}
