import AxiosClient from "../../interceptors/AxiosClient";
import { ArticuloAdapter } from "../../adapters/user/CategoriaAdapter";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const getArticulos = async () => {
    const response = await AxiosClient({
        method: "GET",
        url: "/articulo/get/",
    })
    return response.data.map(item => ArticuloAdapter.toModel(item));
}