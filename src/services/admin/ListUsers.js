import AxiosClient from "../../interceptors/AxiosClient";
import { UserList } from "../../models/user/User";

export const ListUsersService = async () => {
    const response = await AxiosClient({
        method: "GET",
        url: "/user/get/",
    });
    return response.data.map(user => new UserList(user));
}