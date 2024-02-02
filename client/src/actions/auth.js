import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};


export function signin(formData, router) {
  return (
    async (dispatch) => {
      try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router('/');
      } catch (error) {
        console.log(error);
      }
    }
  )
};


