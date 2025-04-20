import axios from "axios";
import { AlertHelper } from "../utilities/alerts/AlertHelper";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const AxiosClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: false,
});

// Interceptor de request: agrega headers
AxiosClient.interceptors.request.use(
  (request) => {
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";

    const session = JSON.parse(localStorage.getItem("user")) || null;
    if (session?.token) {
      request.headers["Authorization"] = `Bearer ${session.token}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
  (response) => {
    const message = response?.data?.message;
    if (message) {
      //AlertHelper.showAlert(message, "success"); 
    }
    return response.data;
  },
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (error?.response?.data === "{message=Usuario inactivo, status=Bad Request}") return AlertHelper.showAlert("Usuario inactivo, contacta con el administrador", "error");
    

    if (!message) {
      switch (status) {
        case 400:
          AlertHelper.showAlert("Revisa los datos e intenta de nuevo", "warning");
          break;
        case 403:
          AlertHelper.showAlert("Acceso prohibido.", "error");
          break;
        case 500:
          AlertHelper.showAlert("Error en el servidor. Intenta más tarde.", "error");
          break;
        default:
          AlertHelper.showAlert("Error inesperado. Contacta con soporte.", "error");
      }
    } else {
      AlertHelper.showAlert(message, "error");
    }

    return Promise.reject(error);
  }
);

export default AxiosClient;
