import invariant from "tiny-invariant";
import * as Tone from "tone";
import { assign, createMachine, fromCallback, fromPromise } from "xstate";
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
    type: "parallel",
    states: {
      audioContext: {
        initial: "unavailable",
        states: {
          unavailable: {
            invoke: {
              id: "waitingForUserEvent",
              src: "waitingForUserEvent",
            },
            on: {
              "audioContext.started": { target: "available" },
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
            entry: ["initializePlayers"],
            invoke: {
              id: "loadSongPlayer",
              src: "loadSongPlayer",
              onDone: "loaded",
            },
          },
          loaded: {
            on: {
              "song.play": {
                actions: ["playSong"],
                guard: "isSongPlayable",
              },
              "song.playPause": [
                {
                  actions: ["pauseSong"],
                  guard: "isSongPausable",
                },
                {
                  actions: ["playSong"],
                  guard: "isSongPlayable",
                },
              ],
              "song.pause": {
                actions: ["pauseSong"],
                guard: "isSongPausable",
              },
              "song.stop": {
                actions: ["stopSong"],
                guard: "isSongStoppable",
              },
              "volume.set": {
                actions: ["setPlayerVolume"],
              },
              "volume.mute": {
                actions: ["togglePlayerMute"],
              },
            },
            exit: ["stopSong", "disposePlayers"],
          },
        },
        on: {
          "song.load": {
            actions: ["assignCurrentSong"],
            target: ".loading",
            internal: false,
          },
        },
      },
    },
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
          players.channel(track.id).sync().start(song.start);
          players.channel(track.id).volume.value = track.volume;
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
        const channel = context.players?.channel(event.trackId);
        if (channel) channel.volume.value = event.value;
      },
      togglePlayerMute: ({ context, event }) => {
        const channel = context.players?.channel(event.trackId);
        if (channel) channel.mute = !channel.mute;
      },
    },
    actors: {
      waitingForUserEvent: fromCallback(({ sendBack }) => {
        async function handler() {
          await Tone.start();
          sendBack({ type: "audioContext.started" });
        }

        document.body.addEventListener("click", handler);

        return () => {
          document.body.removeEventListener("click", handler);
        };
      }),
      loadSongPlayers: fromPromise(async () => await Tone.loaded()),
    },
    guards: {},
    delays: {},
  }
);
