

export const AuthReducer = (
  state = {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("user"),
    firstLogin : localStorage.getItem("firstLogin") || null,
    status : false,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
    return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        firstLogin: action.payload.firstLogin,
        status: action.payload.status,
    };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        firstLogin: null,
        status: false,
      };
    default:
      return state;
  }
};
