import Client from 'spacenet-redux/client';

export function setCSRFFromCookie() {
  if (typeof document !== 'undefined' && typeof document.cookie !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith('SNCSRF=')) {
              Client.setCSRF(cookie.replace('SNCSRF=', ''));
              break;
          }
      }
  }
}

export function relocate(url) {
  window.location.href = window.location.origin
}

export function isLoggedIn() {
  return getSessionToken() ? true : false;
}

export function removeSessionItem(key) {
	window.sessionStorage.removeItem(key)
}

export function setSessionToken(token) {
	window.sessionStorage.setItem('token', token);
	Client.setToken(getSessionToken())
}

export function getSessionToken() {
	return window.sessionStorage.token;
}

