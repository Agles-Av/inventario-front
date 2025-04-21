import { toUserResponsable } from "../../adapters/user/UserAdapter";
import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const UpdateUser = async (userData) => {
    const credenciales = toUserResponsable(userData);

    const response = await AxiosClient({
        method: 'PUT',
        url: `/user/update/${userData.id}/`,
        data: credenciales,
    })
    AlertHelper.showAlert("Usuario actualizado", "success");
    return response;
}