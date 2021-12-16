import Client from 'spacenet-redux/client'

export function setUrl(url) {
  Client.setUrl(url);
  return true;
}