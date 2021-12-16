export function messageListToMap(messageList) {
  const messages = {};
  for (let i = 0; i < messageList.length; i++) {
    messages[messageList[i].id] = messageList[i];
  }

  return messages;
}