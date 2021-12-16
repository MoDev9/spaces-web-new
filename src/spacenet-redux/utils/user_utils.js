export function userListToMap(userList) {
  const users = {};
  for (let i = 0; i < userList.length; i++) {
    users[userList[i].id] = userList[i];
  }

  return users;
}