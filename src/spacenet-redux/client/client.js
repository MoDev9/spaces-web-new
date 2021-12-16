import { getSessionToken } from 'utils/utils';

const HEADER_AUTH = 'Authorization';
const HEADER_BEARER = 'Bearer';
const HEADER_REQUESTED_WITH = 'X-Requested-With';
const HEADER_USER_AGENT = 'User-Agent';
const HEADER_X_CSRF_TOKEN = 'X-CSRF-Token';
const HEADER_TOKEN = 'Token';
const HEADER_CORS = 'Access-Control-Expose-Headers';

export default class ApiClient {
  url = '';
  apiUrl = '/api';
  userId = '';
  token = '';
  csrf = '';
  
  constructor(options) {
    this.setToken(getSessionToken());
  }

  getUrl(){
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  getApiUrl() {
    return this.apiUrl;
  }

  getBaseUrl() {
    return `${this.url}${this.apiUrl}`;
  }

  getToken() {
    return this.token;
}

  setToken(token) {
    this.token = token;
  }

  setCSRF(csrfToken) {
      this.csrf = csrfToken;
  }

  setUserId(userId){
    this.userId = userId;
  }
  
  getUserId(){
    return this.userId;
  }
  
  getUsersRoute() {
    return this.getBaseUrl()+'/users';
  }

  getMessagesRoute() {
    return this.getBaseUrl()+'/messages';
  }
  
  getUserRoute(userId) {
    return `${this.getUsersRoute()}/${userId}`;
  }
  
  getSpacesRoute() {
    return `${this.getBaseUrl()}/spaces`;
  }

  
  getSpaceRoute(spaceId) {
    return `${this.getSpacesRoute()}/${spaceId}`;
  }
  
  getStreamsRoute() {
    return `${this.getBaseUrl()}/streams`;
  }
  
  getStreamRoute(streamId) {
    return `${this.getStreamsRoute()}/${streamId}`;
  }
  
  getChannelRoute(spaceId, channelId) {
    return `${this.getSpaceRoute(spaceId)}/${channelId}`;
  }
  
  getHomeRoute() {
    return this.getSpaceRoute('@me');
  }
  
  getCSRFFromCookie() {
    if (typeof document !== 'undefined' && typeof document.cookie !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('SNCSRF=')) {
          return cookie.replace('SNCSRF=', '');
        }
      }
    }
    return '';
  }
  
  getDefaultStream = () => {
    return this.fetchData(
      `${this.getStreamsRoute()}/default`,
      {method: 'get'},
    );
  };

  //Mock Friends Data
  getMyFriends = () => {
    return this.fetchData(
      `${this.getUserRoute('me')}/friends`,
      {method: 'get'},
    );
  };

  addMemberToStream = (username, streamId) => {
    return this.fetchData(
      `${this.getStreamRoute(streamId)}/members`,
      {
        method: 'post', 
        body: JSON.stringify(username)
      },
    );
  }

  getStreamMembers = (streamId) => {
    return this.fetchData(
      `${this.getStreamRoute(streamId)}/members`,
      {
        method: 'get', 
      },
    );
  }

  addFriend = (username) => {
    return this.fetchData(
      `${this.getUserRoute('me')}/friends`,
      {
        method: 'post', 
        body: JSON.stringify(username)
      },
    );
  }

  getRooms = () => {
    return this.fetchData(
      `${this.getUserRoute('me')}/rooms`,
      {method: 'get'},
    );
  };

  getMySpaces = () => {
    return this.fetchData(
      `${this.getUserRoute('me')}/spaces`,
      {method: 'get'},
    );
  };

  getStreamsForSpace = (spaceId) => {
    return this.fetchData(
      `${this.getUserRoute('me')}/spaces/${spaceId}/streams`,
      {method: 'get'},
    );
  };

  getSpaceMembers = (spaceId) => {
    return this.fetchData(
      `${this.getSpaceRoute(spaceId)}/members`,
      {method: 'get'},
    );
  };

  getSpace = (spaceId) => {
    return this.fetchData(
      `${this.getSpaceRoute(spaceId)}`,
      {method: 'get'},
    );
  };
  
  login = (email, password) => {
    const body = {
      email,
      password,
    };

    return this.fetchData(`${this.getUsersRoute()}/login`, {
      method: 'post',
      body: JSON.stringify(body)
    });
  }

  logout = () => {
    return this.fetchData(`${this.getUsersRoute()}/logout`, {
      method: 'post',
    });
  }

  createUser = (user) => {
    return this.fetchData(
      this.getUsersRoute(),
      {body: JSON.stringify(user), method: "post"}
    );
  }

  getUser = (userId) => {
    return this.fetchData(
      this.getUserRoute(userId),
      {method: 'get'}
    );
  }

  getMessagesForStream = (streamId) => {
    return this.fetchData(
      `${this.getStreamRoute(streamId)}/messages`,
      {method: 'get'}
    );
  }
  
  createMessage = (message) => {
    return this.fetchData(
      this.getMessagesRoute(),
      {method: 'post', body: JSON.stringify(message)},
    );
  }

  createStream = (stream) => {
    return this.fetchData(
      this.getStreamsRoute(),
      {body: JSON.stringify(stream), method: "post"}
    );
  }

  getStream = (streamId) => {
    return this.fetchData(
      this.getStreamRoute(streamId),
      {method: "get"}
    );
  }

  getOptions(options) {
    const newOptions = {...options};

    const headers = {
      [HEADER_REQUESTED_WITH]: 'XMLHttpRequest',
    };

    //headers[HEADER_CORS] = HEADER_TOKEN;

    if (this.token) {
      headers[HEADER_AUTH] = `${HEADER_BEARER} ${this.token}`;
    }

    const csrfToken = this.csrf || this.getCSRFFromCookie();
    if (options.method && options.method.toLowerCase() !== 'get' && csrfToken) {
      headers[HEADER_X_CSRF_TOKEN] = csrfToken;
    }

    if (newOptions.headers) {
      Object.assign(headers, newOptions.headers);
    }

    return {
        ...newOptions,
        headers,
        //credentials: 'include',
    };
  }

  fetchData = async (url, options) => {
    const { data, headers } = await this.fetchResponse(url, options);
    
    if (url.includes('login')) {
      return {data, headers};
    }
    return data;
  }

  fetchResponse = async (url, options) => {
    const response = await fetch(url, this.getOptions(options));
    const headers = response.headers;
    
    let data = '';
    try {
      data = await response.json()
    } catch (error) {
      throw new ClientError(url, {
        Msg: "Received invalid response from the server.",
      });  
    }

    if (response.ok) {
      return {
          response,
          headers,
          data,
      };
    }

    throw new ClientError(url, data);
  }
  
}

function parseHeaders(initialHeaders) {
  const headers = new Map();

}

class ClientError extends Error {
  constructor(url, data) {
    super(url + ': '+ data.Msg);
    this.message = data.Msg;
    this.app_err_code = data.AppErrCode;
    this.status_code = data.StatusCode;
  }
}