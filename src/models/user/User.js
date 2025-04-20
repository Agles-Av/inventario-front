export class User {
    constructor({ id, email, nombre, apellidos, username, role, status }) {
      this.id = id;
      this.name = nombre;
      this.lastName = apellidos;
      this.email = email;
      this.username = username;
      this.role = role;
      this.status = status;
    }
  }
  
  export class UserList {
    constructor({ id, email, nombre, apellidos, username, rol, almacen, status }) {
      this.id = id;
      this.name = nombre;
      this.lastName = apellidos;
      this.email = email;
      this.username = username;
      this.role = rol?.nombre ?? 'N/A'; 
      this.almacen = almacen 
        ? {
            id: almacen.id,
            identificador: almacen.identificador,
            categoria: almacen.categoria?.nombre,
            articulos: almacen.articulos ?? [],
          }
        : null;
      this.status = status;
    }
  }
  

  export class updateUser{
    constructor({  email, nombre, apellidos, username, rol, almacen }) {
      this.email = email;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.username = username;
      this.password = username;
      this.rol = rol;
      this.almacen 
      ? {
        id: almacen.id,
        identificador: almacen.identificador,
        categoria: almacen.categoria?.nombre,
        articulos: almacen.articulos ?? [],
      }
    : null;
    }
  }
  