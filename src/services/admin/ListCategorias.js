import { CategoriaAdapter } from "../../adapters/admin/CategoriaAdapter";
import AxiosClient from "../../interceptors/AxiosClient";

export const ListCategorias = async () => {
    const response = await AxiosClient({
        method: 'GET',
        url: '/categoria/get/',
    })
    return response.data.map((categoria) => {
        return CategoriaAdapter.toModel(categoria);
    });
}