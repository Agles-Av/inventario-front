import AxiosClient from "../../interceptors/AxiosClient";
import { CategoriaAdapter } from "../../adapters/admin/CategoriaAdapter";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";
export const AddCategoria = async (categoria) => {
const payload = CategoriaAdapter.toDTO(categoria);
    const response = await AxiosClient({
        method: 'POST',
        url: '/categoria/save/',
        data: payload
    })
    AlertHelper.showAlert("Categoria creada correctamente", "success");
    return CategoriaAdapter.toModel(response.data);
}