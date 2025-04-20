import { AxiosClient } from "../../interceptors/AxiosClient";
import { payloadToLogin } from "../../adapters/auth/payloadToLogin";
import { toAuthSession } from "../../adapters/auth/toAuthSession";
import { AlertHelper } from "../../utilities/alerts/AlertHelper";

export const LoginService = async (loginCredenciales) => {
  const payload = payloadToLogin(loginCredenciales);
  const response = await AxiosClient({
    method: "POST",
    url: "/auth/login",
    data: payload,
  });
    localStorage.setItem("firstLogin", response.firstLogin);
    AlertHelper.showAlert(`Bienvenido ${response.data.user.nombre}`, "success");
    return toAuthSession(response.data);
};
