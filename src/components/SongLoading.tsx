import { MixerContext } from "../contexts/MixerContext";

export function SongLoading() {
  const isLoading = MixerContext.useSelector((state) =>
    state.matches("song.loading")
  );

  if (!isLoading) return null;

  return <span className="pulse">Loading ...</span>;
}
