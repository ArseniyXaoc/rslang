export type UserType = {
  id: string | null,
  name: string | null,
  email: string | null,
  photoUrl: string | null,
  token: string | null,
  refreshToken: string | null,
}

const InitialStateUser: UserType = {
  id: null,
  name: null,
  email: null,
  token: null,
  photoUrl: null,
  refreshToken: null,
};

Object.keys(InitialStateUser).forEach((itm) => {
  const match = (document.cookie).match(new RegExp(`${itm}=(.*?);`));
  if (match) {
    InitialStateUser[itm] = match[1];
  }
});

const SING_IN = "SING_IN";
const SING_OUT = "SING_OUT";

export const userReducer = (state = InitialStateUser, action: any) => {
  switch (action.type) {
    case SING_IN:
      document.cookie = `id = ${action.value.id}; `;
      document.cookie = `name = ${action.value.name}; `;
      document.cookie = `email = ${action.value.email}; `;
      document.cookie = `photoUrl = ${action.value.photoUrl}; `;
      document.cookie = `token = ${action.value.token}; `;
      document.cookie = `refreshToken = ${action.value.refreshToken}; `;
      return { ...InitialStateUser, ...action.value };
    case SING_OUT:
      document.cookie = `id = ${action.value.id}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `name = ${action.value.name}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `email = ${action.value.email}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `photoUrl = ${action.value.photoUrl}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `token = ${action.value.token}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `refreshToken = ${action.value.refreshToken}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      return {
        id: null,
        name: null,
        email: null,
        token: null,
        photoUrl: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export type SingInType = {
  type: typeof SING_IN,
  value: any,
  payload: any
}

export const signIn = (user: UserType): SingInType => ({
  type: SING_IN,
  value: user,
  payload: user,
});

export type SingOutType = {
  type: typeof SING_OUT,
  value: any,
  payload: any
}

export const signOut = (user: UserType): SingOutType => ({
  type: SING_OUT,
  value: user,
  payload: user,
});
