import AxiosClient from "../../interceptors/AxiosClient";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const DisableUser = async (userId) => {
    const response = await AxiosClient({
        method: 'PUT',
        url: `/user/changeStatus/${userId}/`
    })
    AlertHelper.showAlert("Usuario deshabilitado", "success");
    return response.data;
}