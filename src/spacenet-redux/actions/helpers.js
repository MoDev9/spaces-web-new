
function dispatcher(type, data, dispatch) {
  if (type.indexOf('SUCCESS') === -1) { // we don't want to pass the data for the request types
      dispatch(requestSuccess(type, data));
  } else {
      dispatch(requestData(type));
  }
}

export function requestData(type) {
  return {
    type,
    data: null,
  };
}

export function requestSuccess(type, data) {
  return {
    type,
    data,
  };
}

export function requestFailure(type, error) {
  return {
    type,
    error,
  };
}

export function bindClientFunc({
  clientFunc,
  onRequest,
  onSuccess,
  onFailure,
  params = [],
}) {
  return async (dispatch, getState) => {
    if (onRequest) {
      dispatch(requestData(onRequest));
    }

    let data = null;
    try {
      data = await clientFunc(...params);
    } catch (error) {
      //forceLogoutIfNecessary(error, dispatch, getState);
      dispatch(requestFailure(onFailure, error));
      return {error};
    }

    if (Array.isArray(onSuccess)) {
      onSuccess.forEach((s) => {
        dispatcher(s, data, dispatch)
      });
    } else if (onSuccess) {
      dispatcher(onSuccess, data, dispatch);
    }

    return {data};
  }
}