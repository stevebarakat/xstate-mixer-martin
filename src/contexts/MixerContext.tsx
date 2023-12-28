import { createActorContext } from "@xstate/react";
import { mixerMachine } from "../machines/mixerMachine";

export const MixerContext = createActorContext(mixerMachine, {
  devTools: true,
});
