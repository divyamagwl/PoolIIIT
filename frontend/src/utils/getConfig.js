import store from '../store';

export const getConfig = () => {
  const isAuthenticated = store.getState().isAuthenticated;
  if (isAuthenticated) {
    const token = store.getState().token;
    const config = {
      headers: {Authorization: 'Token ' + token},
    };
    return config;
  }
  return null;
};