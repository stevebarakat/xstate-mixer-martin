import { songs } from "../assets/songs";
import { MixerContext } from "../contexts/MixerContext";

export function SongSelector() {
  const value = MixerContext.useSelector(
    (state) => state.context.currentSong?.slug || ""
  );
  const { send } = MixerContext.useActorRef();

  function handleSongSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const song = songs.find((song) => song.slug === event.target.value);
    if (song) send({ type: "song.load", song });
  }

  return (
    <select name="songs" onChange={handleSongSelect} value={value}>
      <option value="" disabled>
        Choose a song :
      </option>
      {songs.map((song) => (
        <option key={song.slug} value={song.slug}>
          {song.artist} - {song.title}
        </option>
      ))}
    </select>
  );
}
