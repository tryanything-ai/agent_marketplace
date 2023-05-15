export function removeHashFromUrl(url) {
  if (url.endsWith('#')) {
    return url.slice(0, -1);
  } else {
    return url;
  }
}
