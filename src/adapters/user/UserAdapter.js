import {updateUser, updateUserCreate, User} from '../../models/user/User';

export const toUserModel = (responseData) => {
    const user = responseData.data.user;
    return new User({
      id: user.id,
      name: user.nombre,
      lastName: user.apellidos,
      email: user.email,
      username: user.username,
      role: user.rol.nombre,
    });
  };
  
  export const toUserResponsable = (responseData) => {
    return new updateUser({
      email: responseData.email,
      nombre: responseData.name,          
      apellidos: responseData.lastName,   
      username: responseData.username,
      password: responseData?.password || "",
      rol: responseData.rol ,
      almacen: responseData.almacen || null,
    });
  };
  
  export const toUserResponsableCreate = (responseData) => {
    return {
      email: responseData.email,
      nombre: responseData.name,
      apellidos: responseData.lastName,
      username: responseData.username,
      password: responseData.username,
      rol: {
        id: 2
      },
      almacen: {
        id: null
      }
    };
  };