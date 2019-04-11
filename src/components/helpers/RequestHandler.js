/* eslint-disable no-undef */
import { showFailureNotification, showNotification } from '../reusable/Notifications';
import { getItem, setItem } from './localStorage';
import routes from '../../utils/routes';

const QUESTION_BANK_API = process.env.REACT_APP_QUESTION_BANK_API ? process.env.REACT_APP_QUESTION_BANK_API : `${window.location.origin}/questionbank`;
const PROFILES_API = process.env.REACT_APP_PROFILES_API ? process.env.REACT_APP_PROFILES_API : `${window.location.origin}/profiles`;

// const QUESTION_BANK_API = 'http://af293494236ee11e9989602fe773b974-224893321.us-east-1.elb.amazonaws.com/questionbank';
export default class RequestHandler {

  static isAuthenticated() {
    if (!getItem('token')) {
      return false;
    }
    return true;
  }

  // returns header object
  static getHeader(type, data = {}, isFile = false) {
    const header = {
      method: type,
      headers: {
        Accept: 'application/vnd.questionbank.v1',
        'Content-Type': 'application/json',
        // Authorization: getItem('token'),
      },
    };
    if (!isFile) {
      header.headers['Content-Type'] = 'application/json';
    }
    if (type !== 'get') {
      if (isFile) {
        header.body = data;
      } else {
        header.body = JSON.stringify(data);
      }
    }
    return header;
  }

  static isSuccess(payload, status) {
    if (status === 401) {
      showNotification('Unauthorised access.');
      setItem('token', '');
      window.location.href = routes.root;
    }
    if (!(status === 200 || status === 201)) {
      showFailureNotification(payload.message);
      throw Error(payload);
    }
    return payload;
  }

  // HTTP Method get
  static get(action, params = '') {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}${params}`, RequestHandler.getHeader('get'))
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  // HTTP Method post
  static post(action, data, isFile = false) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('post', data, isFile))
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  // HTTP Method put
  static put(action, data, isFile = false) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('put', data, isFile))
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  // HTTP Method delete
  static delete(action) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve,reject) => {
      });
    }
    return new Promise((resolve, reject) => {
      fetch(`${QUESTION_BANK_API}${action}`, RequestHandler.getHeader('delete', {}))
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static profilePost(action, data) {
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    if (!action.includes('/login')) {
      header.headers.Authorization = getItem('token');
    }
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static profileGet(action, data) {
    const header = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
      },
    };
    if (!action.includes('/login') && !action.includes('/config')) {
      header.headers.Authorization = getItem('token');
    }
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static profilePut(action, data) {
    const header = {
      method: 'Put',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
        Authorization: getItem('token'),
      },
      body: JSON.stringify(data),
    };
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static profileDelete(action) {
    const header = {
      method: 'Delete',
      headers: {
        Accept: 'application/vnd.profilemgr.v1',
        'Content-Type': 'application/json',
        Authorization: getItem('token'),
      },
    };
    return new Promise((resolve, reject) => {
      fetch(`${PROFILES_API}${action}`, header)
        .then(response => ({ promise: response.json(), status: response.status }))
        .then(({ promise, status }) => {
          promise.then((payload) => {
            resolve(RequestHandler.isSuccess(payload, status));
          })
            .catch((innerError) => {
              reject(innerError);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static fileUploadPost(action, payload) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return RequestHandler.post(action, payload, true);
  }

  static fileUploadPut(action, payload) {
    if (!RequestHandler.isAuthenticated()) {
      return new Promise((resolve, reject) => {

      });
    }
    return RequestHandler.put(action, payload, true);
  }
}
