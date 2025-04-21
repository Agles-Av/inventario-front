// adapters/ArticuloAdapter.js
import { ArticuloModel } from "../../models/almacen/ArticuloModel";

export const ArticuloAdapter = {
  toModel: (data) => {
    return new ArticuloModel({
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      categoria: data.categoria
        ? {
            id: data.categoria.id,
            nombre: data.categoria.nombre
          }
        : null,
      almacenes: data.almacenes?.map((almacen) => ({
        id: almacen.id,
        identificador: almacen.identificador
      })) ?? null
    });
  },

  toDTO: (model) => {
    return {
      id: model.id,
      nombre: model.nombre,
      descripcion: model.descripcion,
      categoria: model.categoria
        ? {
            id: model.categoria.id
          }
        : null,
      almacenes: model.almacenes?.map((almacen) => ({
        id: almacen.id
      })) ?? null
    };
  }
};
