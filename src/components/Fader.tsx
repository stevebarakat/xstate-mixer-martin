import { MixerContext } from "@/contexts/MixerContext";
import VuMeter from "./VuMeter";

function Fader({ trackId }: { trackId: number }) {
  const { send } = MixerContext.useActorRef();
  const volume = MixerContext.useSelector(
    // Volume object is mutated when changing volume
    // Select the current volume value for a warranted change detection
    (state) => state.context.channels![trackId].volume.value ?? 0
  );

  return (
    <div className="fader-wrap">
      <div className="window">{`${volume?.toFixed(0) ?? -32} dB`}</div>
      <div className="levels-wrap">
        <VuMeter meterValue={new Float32Array(0)} height={150} width={12} />
      </div>
      <div className="vol-wrap">
        <input
          id={trackId.toString()}
          // Careful with this, changing the channel value elsewhere won't be reflected here.
          // Workaround is to use the value attribute instead,
          // but you have to handle the incoming -Infinity value when muting the song.
          value={volume.toFixed()}
          onChange={(event) => {
            const value = Number.parseInt(event.target.value);
            send({ type: "volume.set", trackId, value });
          }}
          type="range"
          className="range-y volume"
          min={-100}
          max={0}
          step={0.1}
        />
      </div>
    </div>
  );
}

export default Fader;
