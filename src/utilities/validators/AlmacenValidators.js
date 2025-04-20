export const almacenValidator = (data) => {
    const errors = {};

    // Validación de campos vacíos
    if (!data.identificador || data.identificador.trim() === '') {
        errors.identificador = 'El identificador es requerido.';
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.identificador)) {
        errors.identificador = 'El identificador no puede contener caracteres especiales.';
    }else if (data.identificador.length < 3) {
        errors.identificador = 'El identificador debe tener al menos 3 caracteres.';
    }
    
    if (!data.categoria || data.categoria.trim() === '') {
        errors.categoria = 'La categoría es requerida.';
    }
    
    if (!data.encargado || data.encargado.trim() === '') {
        errors.encargado = 'El encargado es requerido.';
    }
    
    return errors;
}