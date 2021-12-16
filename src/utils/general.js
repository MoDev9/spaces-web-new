export function getSiteURL() {
  return getSiteURLFromWindowObject(window);
}

function getSiteURLFromWindowObject(window) {
  let siteUrl = '';
  if (window.location.origin) {
    siteUrl = window.location.origin;
  } 
  else {
    siteUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  return siteUrl;
}