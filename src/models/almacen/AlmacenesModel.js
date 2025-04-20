export class Categoria {
    constructor({ id, nombre }) {
      this.id = id;
      this.nombre = nombre;
    }
  }
  
  export class Encargado {
    constructor({ id, email, nombre, apellidos, username, status }) {
      this.id = id;
      this.email = email;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.username = username;
      this.status = status;
    }
  }
  
  export class Articulo {
    constructor({ id, nombre, descripcion }) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  }
  
  export class Almacen {
    constructor({ id, categoria, encargado, identificador, articulos }) {
      this.id = id;
      this.identificador = identificador;
      this.categoria = new Categoria(categoria);
      this.encargado = new Encargado(encargado);
      this.articulos = articulos.map((articulo) => new Articulo(articulo));
    }
  }
  