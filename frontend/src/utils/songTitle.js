const FEAT_PREFIX = /^(feat\.?|ft\.?|featuring|with)\s+/i;

const normalizeForMatch = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

const parenContainsArtist = (inner, artists) => {
  const withoutPrefix = inner.replace(FEAT_PREFIX, '').trim();
  const normalizedInner = normalizeForMatch(withoutPrefix);

  return artists.some((artist) => {
    const normalizedArtist = normalizeForMatch(artist);
    return normalizedArtist.length > 0 && normalizedInner.includes(normalizedArtist);
  });
};

export const getDisplaySongTitle = (name, artists) => {
  if (!name || !artists?.length) return name ?? '';

  const cleaned = name.replace(/\([^)]*\)/g, (segment) => {
    const inner = segment.slice(1, -1);
    return parenContainsArtist(inner, artists) ? '' : segment;
  });

  return cleaned.replace(/\s+/g, ' ').trim();
};
