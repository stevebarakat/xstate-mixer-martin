import { MixerContext } from "@/contexts/MixerContext";
import { TransportButton } from "../Buttons";
import { Square } from "lucide-react";

function Reset() {
  const { send } = MixerContext.useActorRef();

  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.stop" })
  );

  return (
    <TransportButton
      onClick={() => send({ type: "song.stop" })}
      disabled={disabled}
    >
      <Square />
    </TransportButton>
  );
}

export default Reset;
