const state = {
  entities: {
    general: {
      config: {},
      credentials: {},
      timezones: [],
    },
    users: {
      currentUserId: '',
      currentRoomId: '',
      mySessions: [],
      profiles: {},
      statuses: {},
      friends: {},
      rooms: {},
    },
    spaces: {
      currentSpaceId: '',
      spaces: {},
      myMembers: {},
      membersInSpace: {},
      totalCount: 0,
    },
    streams: {
      currentStreamId: '',
      streams: {},
      streamsInSpace: {},
      myMembers: {},
      membersInStream: {},
      totalCount: 0,
    },
    messages: {
      messages: {},
      messagesReplies: {},
      messagesInstream: {},
      pendingmessageIds: [],
      reactions: {},
      selectedmessageId: '',
      currentFocusedmessageId: ''
    },
    typing: {},
  },
  errors: [],
  requests: {
    streams: {
      getAllstreams: {
          status: 'not_started',
          error: null,
      },
      getstreams: {
          status: 'not_started',
          error: null,
      },
      mystreams: {
          status: 'not_started',
          error: null,
      },
      createstream: {
          status: 'not_started',
          error: null,
      },
      updatestream: {
          status: 'not_started',
          error: null,
      },
    },
    general: {
      websocket: {
          status: 'not_started',
          error: null,
      },
    },
    messages: {
      createmessage: {
          status: 'not_started',
          error: null,
      },
      editmessage: {
          status: 'not_started',
          error: null,
      },
    },
    spaces: {
      getMyspaces: {
          status: 'not_started',
          error: null,
      },
      getspaces: {
          status: 'not_started',
          error: null,
      },
      joinspace: {
          status: 'not_started',
          error: null,
      },
    },
    users: {
      login: {
          status: 'not_started',
          error: null,
      },
      logout: {
          status: 'not_started',
          error: null,
      },
      autocompleteUsers: {
          status: 'not_started',
          error: null,
      },
      updateMe: {
          status: 'not_started',
          error: null,
      },
    },
  },
  websocket: {
    connected: false,
    lastConnectAt: 0,
    lastDisconnectAt: 0,
  },
};

export default state;