import { toFirstLogin } from "../../adapters/auth/toFirstLogin";
import AxiosClient from "../../interceptors/AxiosClient";
import { User } from "../../models/user/User";

export const FirstLoginService = async (loginCredenciales) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const idUSer = user.user.id;
    const payload = toFirstLogin(loginCredenciales);
    const response = await AxiosClient({
        method: "PUT",
        url: `/auth/updatePassword/${idUSer}`,
        data: payload,
    });
    return new User({
        ...response.data,
        role: response.data.rol.nombre
      })
}