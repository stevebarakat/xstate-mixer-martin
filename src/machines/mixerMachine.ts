import invariant from "tiny-invariant";
import { Player, loaded, start, Transport as t } from "tone";
import { assign, createMachine, fromCallback, fromPromise } from "xstate";
import { Song } from "../types/songs";

type MixerContext = {
  currentSong?: Song;
  players?: Player[];
};

export const mixerMachine = createMachine(
  {
    id: "mixerMachine",
    context: {
      currentSong: undefined,
      players: [],
    },
    type: "parallel",
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
                },
              ],
            },
          },
          loaded: {
            exit: [
              {
                type: "stopSong",
              },
              {
                type: "disposePlayers",
              },
            ],
            on: {
              "song.play": {
                guard: "isSongPlayable",
                actions: {
                  type: "playSong",
                },
              },
              "song.playPause": [
                {
                  guard: "isSongPausable",
                  actions: {
                    type: "pauseSong",
                  },
                },
                {
                  guard: "isSongPlayable",
                  actions: {
                    type: "playSong",
                  },
                },
              ],
              "song.pause": {
                guard: "isSongPausable",
                actions: {
                  type: "pauseSong",
                },
              },
              "song.stop": {
                guard: "isSongStoppable",
                actions: {
                  type: "stopSong",
                },
              },
              "volume.set": {
                actions: {
                  type: "setPlayerVolume",
                },
              },
              "volume.mute": {
                actions: {
                  type: "togglePlayerMute",
                },
              },
            },
          },
        },
        on: {
          "song.load": {
            target: ".loading",
            actions: {
              type: "assignCurrentSong",
            },
          },
        },
      },
    },
    types: {
      context: {} as MixerContext,
      events: {} as
        | { type: "audioContext.started" }
        | { type: "song.play" }
        | { type: "song.playPause" }
        | { type: "song.pause" }
        | { type: "song.stop" }
        | { type: "volume.set" }
        | { type: "volume.mute" }
        | { type: "song.load" },
    },
  },
  {
    actions: {
      initializePlayers: assign(({ context, event }) => {
        const song = context.currentSong;
        invariant(song, "Current song should be known");
        let players: Player[] = [];
        song.tracks.forEach((track) => {
          players = [
            new Player(track.path).toDestination().sync().start(),
            ...players,
          ];
        });

        return {
          currentSong: event.song,
          players,
        };
      }),
      stopSong: () => t.stop(),
      playSong: () => t.start(),
      pauseSong: () => t.pause(),
      assignCurrentSong: assign(({ event }) => {
        return {
          currentSong: event.song,
        };
      }),
      disposePlayers: assign(({ context }) => {
        context.players?.forEach((player) => player.dispose());
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
      waitingForUserEvent: fromCallback(({ sendBack }) => {
        function handler() {
          start();
          sendBack({ type: "audioContext.started" });
        }

        document.body.addEventListener("click", handler);

        return () => {
          document.body.removeEventListener("click", handler);
        };
      }),
      loadSongPlayers: fromPromise(async () => await loaded()),
    },
    guards: {
      isSongPlayable: () => t.state === "stopped" || t.state === "paused",
      isSongPausable: () => t.state === "started",
      isSongStoppable: () => t.state === "started" || t.state === "paused",
    },
    delays: {},
  }
);
