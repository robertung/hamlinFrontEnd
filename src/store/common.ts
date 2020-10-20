import axios from 'axios';

const apiDomain = process.env.VUE_APP_API_DOMAIN;
const access_token = localStorage.getItem('access_token');

export function apiPut(url: string, data: {}) {
  return new Promise((resolve, reject) => {
      const dataQS = JSON.stringify(data);
      axios({
        method: 'PUT',
        url: `${apiDomain}/api/${url}`,
        data: dataQS,
        headers: {
          Authorization: `${access_token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
        	resolve(response);
        })
        .catch((error) => {
        	reject(error.response);
        });
    // });
  });
}
export function apiPost(url: string, data: {}) {
  return new Promise((resolve, reject) => {
      const dataQS = JSON.stringify(data);
      // console.log(dataQS, 'dataQS');
      axios({
        method: 'POST',
        url: `${apiDomain}/${url}`,
        data: dataQS,
        headers: {
        	Authorization: `${access_token}`,
        	'Content-Type': 'application/json',
        },
      })
        .then((response) => {
        	resolve(response);
        })
        .catch((error) => {
        	reject(error.response);
        });
  });
}

export function apiPostImage(url: string, data: {}) {
  return new Promise((resolve, reject) => {
      // const dataQS = JSON.stringify(data);
      // console.log(dataQS, 'dataQS');
      axios({
        method: 'POST',
        url: `${apiDomain}/${url}`,
        data: data,
        headers: {
        	Authorization: `${access_token}`,
        	// 'Content-Type': 'application/json',
        },
      })
        .then((response) => {
        	resolve(response);
        })
        .catch((error) => {
        	reject(error.response);
        });
  });
}

export function apiDelete(url: string, data: {}) {
  return new Promise((resolve, reject) => {
    // localForage.getItem('access_token').then((userTokens: any) => {
      const dataQS = JSON.stringify(data);
      console.log(dataQS, 'dataQS');
      axios({
        method: 'DELETE',
        url: `${apiDomain}/${url}`,
        data: dataQS,
        headers: {
          Authorization: `${access_token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
        	resolve(response);
        })
        .catch((error) => {
        	reject(error.response);
        });
    // });
  });
}

export function apiGetNone(url: string, params: {}) {
  return new Promise((resolve, reject) => {
    console.log(apiDomain, 'env');
    const dataQS = JSON.stringify(params);
    axios({
      method: 'GET',
      url: `${apiDomain}/${url}`,
      data: dataQS,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export function apiGet(url: string) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `${apiDomain}/${url}`,
      headers: {
        Authorization: `${access_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export function apiLogin(payload) {
  const { email, password } = payload;
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${apiDomain}/login`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {
    	  email,
        password,
	    },
    })
      .then((response) => {
        localStorage.setItem('access_token', response.data.token);
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export function apiRefresh(payload: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${process.env.API_BASE_URL}oauth/token`,
      data: {
        grant_type: process.env.OAUTH_REFRESH_GRANT_TYPE,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        refresh_token: payload.refreshToken,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
}

export default {
  apiPut,
  apiPost,
  apiDelete,
  apiGet,
  apiGetNone,
  apiLogin,
  apiRefresh,
  apiPostImage,
};