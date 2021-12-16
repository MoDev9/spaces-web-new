export function streamListToMap(streamList) {
  const streams = {};
  for (let i = 0; i < streamList.length; i++) {
    streams[streamList[i].id] = streamList[i];
  }

  return streams;
}