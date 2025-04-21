export const CategoriaValidator = (data) => {

    
    const errors = {};
    if (!data.nombre || data.nombre.trim() === '') {
        errors.nombre = 'El nombre es requerido.';
    }else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.nombre)) {
        errors.nombre = 'El nombre no puede contener caracteres especiales.';
    }
    else if (data.nombre.length < 3) {
        errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }


    return errors;
}