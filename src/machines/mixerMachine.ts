import invariant from "tiny-invariant";
import { Channel, Player, loaded, start, Transport as t } from "tone";
import { assign, createMachine, fromCallback, fromPromise } from "xstate";
import { Song } from "../types/songs";

type MixerContext = {
  currentSong?: Song;
  channels?: Channel[];
};

export const mixerMachine = createMachine(
  {
    id: "mixerMachine",
    context: {
      currentSong: undefined,
      channels: [],
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
              fastFwd: {
                actions: {
                  type: "fastFwd",
                },
              },
              rewind: {
                actions: {
                  type: "rewind",
                },
              },
              "volume.set": {
                actions: {
                  type: "setPlayerVolume",
                },
              },
              "volume.solo": {
                actions: {
                  type: "togglePlayerSolo",
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
        | { type: "volume.solo" }
        | { type: "song.load" },
    },
  },
  {
    actions: {
      initializePlayers: assign(({ context, event }) => {
        const song = context.currentSong;
        invariant(song, "Current song should be known");
        let players: Player[] = [];
        let channels: Channel[] = [];
        song.tracks.map((track, i) => {
          channels = [new Channel().toDestination(), ...channels];
          return (players = [...players, new Player(track.path)]);
        });
        players?.map(
          (player, i) => channels && player.connect(channels[i]).sync().start(0)
        );
        return {
          currentSong: event.song,
          channels,
        };
      }),
      stopSong: () => t.stop(),
      playSong: () => t.start(),
      pauseSong: () => t.pause(),
      fastFwd: () => {
        t.seconds = t.seconds + 10;
      },
      rewind: () => {
        t.seconds = t.seconds - 10;
      },
      assignCurrentSong: assign(({ event }) => {
        return {
          currentSong: event.song,
        };
      }),
      disposePlayers: assign(({ context }) => {
        context.channels?.forEach((channel) => channel.dispose());
        return {
          channels: undefined,
        };
      }),
      setPlayerVolume: ({ context, event }) => {
        const channel = context.channels[event.trackId];
        if (channel) channel.volume.value = event.value;
      },
      togglePlayerMute: ({ context, event }) => {
        const channel = context.channels[event.trackId];
        if (channel) channel.mute = !channel.mute;
      },
      togglePlayerSolo: ({ context, event }) => {
        const channel = context.channels[event.trackId];
        if (channel) channel.solo = !channel.solo;
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
