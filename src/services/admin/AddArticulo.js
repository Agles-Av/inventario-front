import AxiosClient from "../../interceptors/AxiosClient";
import { ArticuloAdapter } from "../../adapters/user/CategoriaAdapter";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const addArticulo = async (articulo) => {
    
  const payload = {
    nombre: articulo.nombre,
    descripcion: articulo.descripcion,
    categoria: {
      id: articulo.categoria,
    },
    almacenes: [
      {
        id: articulo.almacenes,
      },
    ],
  };

  const response = await AxiosClient({
    method: "POST",
    url: "/articulo/save/",
    data: payload,
  });
  AlertHelper.showAlert(
    "Articulo creado correctamente",
    "success"
  );
  return ArticuloAdapter.toModel(response.data);
};
