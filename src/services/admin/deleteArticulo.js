import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const deleteArticulo = async (id) => {
    const response = await AxiosClient({
        method: "DELETE",
        url: `/articulo/delete/${id}/`,
    });
    AlertHelper .showAlert("Articulo eliminado correctamente", "success");
    return response.data;
}