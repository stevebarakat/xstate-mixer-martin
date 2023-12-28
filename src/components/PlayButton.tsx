import { MixerContext } from "../contexts/MixerContext";

export function PlayButton() {
  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.play" })
  );
  const { send } = MixerContext.useActorRef();

  return (
    <button onClick={() => send({ type: "song.play" })} disabled={disabled}>
      Play
    </button>
  );
}
