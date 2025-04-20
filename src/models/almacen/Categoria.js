export class CategoriaModel {
    constructor({ id = null, nombre = "", articulo = null, almacen = null }) {
      this.id = id;               // número o null si es nueva
      this.nombre = nombre;       // string
      this.articulo = articulo;   // array de artículos o null
      this.almacen = almacen;     // array de almacenes o null
    }
  
    static empty() {
      return new CategoriaModel({
        id: null,
        nombre: "",
        articulo: null,
        almacen: null
      });
    }
  }
   