import { CambiarResponsable } from "../../adapters/user/AlmacenAdapter";
import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const CambiarEncargado = async (id, idResponsable,idCategoria,identificador) => {
    const credenciales = CambiarResponsable(id, idResponsable,idCategoria,identificador);
    const response = await AxiosClient({
        method: 'PUT',
        url: `/almacen/update/${id}/`,
        data: credenciales
    })
    AlertHelper.showAlert("El responsable se ha cambiado correctamente", "success");
    return response.data;
}