import { AlmacenAdapter } from "../../adapters/user/AlmacenAdapter";
import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const AddAlmacen = async (almacen) => {
    const credenciales = AlmacenAdapter.toDTO(almacen);
    const response = await AxiosClient({
        method: 'POST',
        url: '/almacen/save/',
        data: credenciales
    })
    AlertHelper.showAlert("Almacen creado correctamente", "success");
    return  AlmacenAdapter.toModel(response.data);    
}