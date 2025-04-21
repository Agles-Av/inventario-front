export const inputsValidator = (data) => {
    
    const errors = {};
    if (!data.nombre || data.nombre.trim() === '') {
        errors.nombre = 'El nombre es requerido.';
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.nombre)) {
        errors.nombre = 'El nombre no puede contener caracteres especiales.';
    } else if (data.nombre.length < 3) {
        errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!data.descripcion || data.descripcion.trim() === '') {
        errors.descripcion = 'La descripción es requerida.';
    } else if (data.descripcion.length < 10) {
        errors.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ()._\s]+$/.test(data.descripcion)) {
        errors.descripcion = 'La descripción no puede contener caracteres especiales solo ()_.';
    }

    return errors;

}

export const DropdownValidator = (data) => {

    const errors = {};
    if (!data || data.length === 0) {
        errors.dropdown = 'Este campo es requerido.';
    }
    return errors;
}