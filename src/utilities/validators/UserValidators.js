export const userValidator = (data) => {
    const errors = {};
    
    // Validación de email
    if (!data.email) {
        errors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Ingrese un correo electrónico válido';
    } else if (data.email.length > 75) {
        errors.email = 'El correo no debe exceder los 75 caracteres';
    }

    // Validación de nombre
    if (!data.name) {
        errors.name = 'El nombre es requerido';
    } else if (data.name.length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.name.length > 50) {
        errors.name = 'El nombre no debe exceder los 50 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name)) {
        errors.name = 'El nombre solo debe contener letras';
    }

    // Validación de apellidos
    if (!data.lastName) {
        errors.lastName = 'Los apellidos son requeridos';
    } else if (data.lastName.length < 2) {
        errors.lastName = 'Los apellidos deben tener al menos 2 caracteres';
    } else if (data.lastName.length > 50) {
        errors.lastName = 'Los apellidos no deben exceder los 50 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.lastName)) {
        errors.lastName = 'Los apellidos solo deben contener letras';
    }

    // Validación de username
    if (!data.username) {
        errors.username = 'El nombre de usuario es requerido';
    } else if (data.username.length < 4) {
        errors.username = 'El usuario debe tener al menos 4 caracteres';
    } else if (data.username.length > 30) {
        errors.username = 'El usuario no debe exceder los 30 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
        errors.username = 'Solo se permiten letras, números y guiones bajos';
    }

    // Validación de contraseña (solo en modo creación o si se proporciona)
    if ((!data.id && !data.password) || (data.password !== undefined && !data.password)) {
        errors.password = 'La contraseña es requerida';
    } else if (data.password && data.password.length < 5) {
        errors.password = 'La contraseña debe tener al menos 5 caracteres';
    } else if (data.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password = 'Debe contener mayúsculas, minúsculas y números';
    }


    return errors;
}