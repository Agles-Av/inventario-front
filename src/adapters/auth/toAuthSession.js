import {User} from '../../models/user/User';

export const toAuthSession = (responseData) => {
  return {
    token: responseData.token,
    tokenType: responseData.tokenType,
    user: new User({
      ...responseData.user,
      role: responseData.user.rol?.nombre
    })
  };
};
