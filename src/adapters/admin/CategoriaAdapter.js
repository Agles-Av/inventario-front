import { CategoriaModel } from "../../models/almacen/Categoria";
export const CategoriaAdapter = {
    toModel: (data) => {
      return new CategoriaModel({
        id: data.id,
        nombre: data.nombre,
        articulo: data.articulo ?? null,
        almacen: data.almacen ?? null
      });
    },
  
    toDTO: (model) => {
      return {
        id: model.id,
        nombre: model.nombre,
        articulo: model.articulo?.map((a) => ({
          id: a.id,
          nombre: a.nombre,
          descripcion: a.descripcion
        })) ?? null, 
        almacen: model.almacen?.map((a) => ({
          id: a.id,
          identificador: a.identificador
        })) ?? null
      };
    }
  };