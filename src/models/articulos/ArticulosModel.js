// models/ArticuloModel.js

export class ArticuloModel {
    constructor({ id, nombre, descripcion, categoria, almacenes }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = {
            id: categoria?.id,
            nombre: categoria?.nombre
        };
        this.almacenes = almacenes?.map(almacen => ({
            id: almacen.id,
            identificador: almacen.identificador
        })) || [];
    }
}
