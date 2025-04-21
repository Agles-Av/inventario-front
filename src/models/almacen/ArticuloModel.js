export class ArticuloModel {
    constructor({
      id = null,
      nombre = "",
      descripcion = "",
      categoria = null,
      almacenes = null
    }) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.categoria = categoria;     // { id, nombre } o null
      this.almacenes = almacenes;     // array de { id, identificador } o null
    }
  
    static empty() {
      return new ArticuloModel({
        id: null,
        nombre: "",
        descripcion: "",
        categoria: null,
        almacenes: null
      });
    }
  }
  