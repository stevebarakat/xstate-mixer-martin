import { MixerContext } from "@/contexts/MixerContext";
import { TransportButton } from "../Buttons";
import { Play as PlayIcon, Pause as PauseIcon } from "lucide-react";

function Play() {
  const canPause = MixerContext.useSelector((state) =>
    // Dirty hack which to determine which button to display
    state.can({ type: "song.pause" })
  );
  const disabled = MixerContext.useSelector(
    (state) => !state.can({ type: "song.playPause" })
  );
  const { send } = MixerContext.useActorRef();

  return (
    <TransportButton
      onClick={() => send({ type: "song.playPause" })}
      disabled={disabled}
    >
      {canPause ? <PauseIcon /> : <PlayIcon />}
    </TransportButton>
  );
}

export default Play;
