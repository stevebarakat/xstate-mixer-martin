import { MixerContext } from "../contexts/MixerContext";

export function StopButton() {
  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.stop" })
  );
  const { send } = MixerContext.useActorRef();

  return (
    <button onClick={() => send({ type: "song.stop" })} disabled={disabled}>
      Stop
    </button>
  );
}
