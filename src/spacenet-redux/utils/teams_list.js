export function spaceListToMap(spaceList) {
  const spaces = {};
  for (let i = 0; i < spaceList.length; i++) {
    spaces[spaceList[i].id] = spaceList[i];
  }

  return spaces;
}