import { AlmacenModel } from "../../models/almacen/AlmacenesModel";

export const CambiarResponsable =  (id, idResponsable, idCategoria, identificador) => {
    return{
        categoria: {
            id: idCategoria
        },
        encargado: {
            id: idResponsable
        },
        identificador: identificador,
        articulos: null
    }
}

export const AlmacenAdapter = {
    toModel: (data) => {
      return new AlmacenModel({
        categoria: data.categoria,
        encargado: data.encargado,
        identificador: data.identificador,
        articulos: data.articulos ?? null
      });
    },
  
    toDTO: (model) => {
      return {
        categoria: { id: model.categoria },
        encargado: { id: model.encargado },
        identificador: model.identificador,
        articulos: model.articulos?.map((articulo) => ({
          id: articulo.id,
          nombre: articulo.nombre,
          descripcion: articulo.descripcion
        })) ?? null
      };
    }
  };