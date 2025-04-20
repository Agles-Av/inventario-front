import { toUserResponsableCreate } from "../../adapters/user/UserAdapter";
import AxiosClient from "../../interceptors/AxiosClient";
import { UserList } from "../../models/user/User";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const AddUser = async (userData) => {
    const credenciales = toUserResponsableCreate(userData);
    const response = await AxiosClient({
        method: 'POST',
        url: '/user/save/',
        data: credenciales,
    })
    AlertHelper.showAlert("Usuario creado", "success");
    console.log(response);
    return new UserList(response.data)
}