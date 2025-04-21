import AxiosClient from "../../interceptors/AxiosClient";

export const deleteArticulo = async (id) => {
    const response = await AxiosClient({
        method: "DELETE",
        url: `/articulo/delete/${id}/`,
    });
    return response.data;
}