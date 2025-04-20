export const loginValidator = (data) => {
    const errors = {};
    
    // Validación de campos vacíos
    if (!data.username || data.username.trim() === '') {
        errors.username = 'El usuario es requerido.';
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.username)) {
        errors.username = 'El usuario no puede contener caracteres especiales.';
    }

    if (!data.password || data.password.trim() === '') {
        errors.password = 'La contraseña es requerida.';
    } 

    return errors;
};
