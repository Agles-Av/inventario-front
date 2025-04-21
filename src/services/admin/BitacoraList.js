import AxiosClient from "../../interceptors/AxiosClient";
export const getBitacoraList = async () => {
    const response = await AxiosClient({
        method: 'get',
        url: '/bitacora/'
    })
    return response.data;
} 