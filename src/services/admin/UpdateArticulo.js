import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";
export const updateArticulo = async (articulo, id) => {

    
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
        method: "PUT",
        url: `/articulo/update/${id}/`,
        data: payload,
    });
    AlertHelper.showAlert(
        "Articulo actualizado correctamente",
        "success"
    );
    return response.data;
}