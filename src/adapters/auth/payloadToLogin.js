export const payloadToLogin = (credenciales) =>({
    username: credenciales.username,
    password: credenciales.password,
}); 