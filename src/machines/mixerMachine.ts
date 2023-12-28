import invariant from "tiny-invariant";
import * as Tone from "tone";
import { assign, createMachine } from "xstate";
import { Song } from "../types/songs";

type MixerContext = {
  currentSong?: Song;
  players?: Tone.Players;
};

export const mixerMachine = createMachine(
  {
    id: "mixerMachine",
    context: {
      currentSong: undefined,
      players: undefined,
    },
    states: {
      audioContext: {
        initial: "unavailable",
        states: {
          unavailable: {
            invoke: {
              src: "waitingForUserEvent",
              id: "waitingForUserEvent",
            },
            on: {
              "audioContext.started": {
                target: "available",
                reenter: true,
              },
            },
          },
          available: {
            type: "final",
          },
        },
      },
      song: {
        initial: "idle",
        states: {
          idle: {},
          loading: {
            entry: {
              type: "initializePlayers",
            },
            invoke: {
              src: "loadSongPlayers",
              id: "loadSongPlayers",
              onDone: [
                {
                  target: "loaded",
                  reenter: true,
                },
              ],
              onError: [
                {
                  target: "idle",
                  actions: {
                    type: "disposePlayers",
                  },
                  reenter: true,
                },
              ],
            },
          },
          loaded: {
            initial: "stopped",
            states: {
              stopped: {
                entry: {
                  type: "stopSong",
                },
                on: {
                  "song.play": {
                    target: "playing",
                    reenter: true,
                  },
                  "song.playPause": {
                    target: "playing",
                    reenter: true,
                  },
                },
              },
              playing: {
                entry: {
                  type: "playSong",
                },
                tags: "playing",
                on: {
                  "song.pause": {
                    target: "paused",
                    reenter: true,
                  },
                  "song.playPause": {
                    target: "paused",
                    reenter: true,
                  },
                  "song.stop": {
                    target: "stopped",
                    reenter: true,
                  },
                },
              },
              paused: {
                entry: {
                  type: "pauseSong",
                },
                on: {
                  "song.play": {
                    target: "playing",
                    reenter: true,
                  },
                  "song.playPause": {
                    target: "playing",
                    reenter: true,
                  },
                  "song.stop": {
                    target: "stopped",
                    reenter: true,
                  },
                },
              },
            },
            on: {
              "volume.set": {
                target: "loaded",
                actions: {
                  type: "setPlayerVolume",
                },
                reenter: false,
              },
              "volume.mute": {
                target: "loaded",
                actions: {
                  type: "togglePlayerMute",
                },
                reenter: false,
              },
            },
            exit: ["stopSong", "disposePlayers"],
          },
        },
        on: {
          "song.load": {
            target: ".loading",
            actions: {
              type: "assignCurrentSong",
            },
            reenter: false,
          },
        },
      },
    },
    type: "parallel",
    types: {
      context: {} as MixerContext,
      events: {} as
        | { type: "song.load" }
        | { type: "song.play" }
        | { type: "song.stop" }
        | { type: "song.pause" }
        | { type: "volume.set" }
        | { type: "volume.mute" }
        | { type: "song.playPause" }
        | { type: "audioContext.started" },
    },
  },
  {
    actions: {
      initializePlayers: assign(({ context, event }) => {
        const song = context.currentSong;
        invariant(song, "Current song should be known");
        const players = new Tone.Players().toDestination();
        song.tracks.forEach((track) => {
          players.add(track.id, track.path);
          players.player(track.id).sync().start(song.start);
          players.player(track.id).volume.value = track.volume;
        });

        return {
          currentSong: event.song,
          players,
        };
      }),
      stopSong: () => Tone.Transport.stop(),
      playSong: () => Tone.Transport.start(),
      pauseSong: () => Tone.Transport.pause(),
      assignCurrentSong: assign(({ event }) => {
        return {
          currentSong: event.song,
        };
      }),
      disposePlayers: assign(({ context }) => {
        context.players?.dispose();
        return {
          players: undefined,
        };
      }),
      setPlayerVolume: ({ context, event }) => {
        const player = context.players?.player(event.playerId);
        if (player) player.volume.value = event.value;
      },
      togglePlayerMute: ({ context, event }) => {
        const player = context.players?.player(event.playerId);
        if (player) player.mute = !player.mute;
      },
    },
    actors: {
      waitingForUserEvent: () => (sendBack) => {
        async function startAudioContext() {
          await Tone.start();
          sendBack({ type: "audioContext.started" });
        }

        document.addEventListener("click", startAudioContext);
        document.addEventListener("keydown", startAudioContext);

        return () => {
          document.removeEventListener("click", startAudioContext);
          document.removeEventListener("keydown", startAudioContext);
        };
      },
      loadSongPlayers: async () => {
        return Tone.loaded();
      },
    },
    guards: {},
    delays: {},
  }
);
