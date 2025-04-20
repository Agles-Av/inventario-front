import AxiosClient from "../../interceptors/AxiosClient";
import { Almacen } from "../../models/almacen/AlmacenesModel";

export const getAlmacenes = async () => {
  const response = await AxiosClient({
    method: "GET",
    url: "/almacen/get/",
  });
  return response.data.map((item) => new Almacen(item));
};
