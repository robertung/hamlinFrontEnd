import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import { apiLogin, apiPostImage, apiPost, apiGet, apiDelete } from './common';

Vue.use(Vuex);
interface Response {
  data: {
    token: string;
    user: {};
  };
  status: {};
}
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    user: null,
    userImage: null,
    userImageForVote: null,
    userId: null,
    gallery: null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    user(state) {
      return state.user;
    },
    userImage(state) {
      return state.userImage;
    },
    getImageById(state) {
      return state.userImageForVote;
    },
    getUserId(state) {
      return state.userId;
    },
    getGaller(state) {
      return state.gallery;
    },
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      Vue.set(state, 'token', data);
    },
    SET_USER: (state, data) => {
      Vue.set(state, 'user', data);
    },
    SET_USER_ID: (state, data) => {
      Vue.set(state, 'userId', data);
    },
    SET_USER_IMAGE: (state, data) => {
      Vue.set(state, 'userImage', data);
    },
    SET_IMAGE_BY_ID: (state, data) => {
      Vue.set(state, 'userImageForVote', data);
    },
    SET_GALLERY: (state, data) => {
      Vue.set(state, 'gallery', data);
    },
    CLEAR_DATA: (state) => {
      Vue.set(state, 'token', null);
      Vue.set(state, 'user', null);
    },
  },
  actions: {
    gallery: ({ commit }) => {
      return apiGet('gallery')
        .then((response: Response) => {
          return commit('SET_GALLERY', response.data);
        })
        .catch((error) => error);
    },
    register: ({ commit }, payload) => {
      return apiPost('register', payload)
        .then((response: Response) => {
          if (response.status === 200) {
            commit('SET_TOKEN', response.data);
          }
          return response;
        })
        .catch((error) => error);
    },
    login: ({ commit }, payload) => {
      return apiLogin(payload)
        .then((response: Response) => {
          if (response.status === 200) {
            commit('SET_TOKEN', response.data.token);
            commit('SET_USER', response.data.user);
          }
          return response;
        })
        .catch((error) => error);
    },
    upload: ({ state }, formData) => {
      return apiPostImage('upload', formData)
        .catch((error) => error);
    },
    userImage: ({ state, commit }, payload) => {
      return apiGet(`userimage/${payload.userId}`)
        .then((response: Response) => {
          commit('SET_USER_IMAGE', response.data);
        })
        .catch((error) => error);
    },
    imageById: ({ state, commit }, payload) => {
      return apiGet(`image/${payload.userId}`)
        .then((response: Response) => {
          commit('SET_IMAGE_BY_ID', response.data);
        })
        .catch((error) => error);
    },
    deleteImages: ({ state, commit }, payload) => {
      return apiDelete('removeimages', payload)
        .catch((error) => error);
    },
    logout: ({ state }, payload) => {
      return apiDelete('logout', payload)
        .catch((error) => console.log(`logout error ${error}`));
    },
    vote: ({state}, payload) => {
      return apiPost('vote', payload)
        .catch((error) => console.log(`logout error ${error}`));
    },
    fetchUserData: ({ commit, dispatch }) => {
      const payload = {
        token: localStorage.getItem('access_token') || null,
      };
      if (payload.token !== null) {
        return apiPost('checktoken', payload)
          .then((response: Response) => {
            const payload = {
              userId: response.data[0].user_id,
            };
            commit('SET_USER_ID', response.data[0].user_id);
            dispatch('userImage', payload);
          })
          .catch((error) => console.log(`logout error ${error}`));
      } else {
          return console.log('FAILED');
      }
    },
    sendMessage: ({ commit }, payload) => {
      return apiPost('message', payload)
        .catch((error) => console.log(`message error ${error}`));
    },
    sendRaffle: ({ commit }, payload) => {
      return apiPost('raffleregister', payload)
        .catch((error) => console.log(`raffle message error ${error}`));
    }
  },
  modules: {
  },
});
