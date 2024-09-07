import axiosClient from "./axiosClient";

const userApi = {
    login(email, password) {
        const url = '/auth/login';
        return axiosClient
            .post(url, {
                email,
                password,
            })
            .then(response => {

                console.log(response);
                if (response.user.status != "noactived") {
                    console.log(response);
                    localStorage.setItem("client", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));

                }
                return response;
            });
    },
    logout(data) {
        const url = '/user/logout';
        return axiosClient.get(url);
    },
    getProfile(){
        const url = '/user/profile';
        return axiosClient.get(url);
    },
    updateProfile(data, id) {
        const url = '/user/updateProfile/' + id;
        return axiosClient.put(url, data);
    },

    forgotPassword(data) {
        const url = '/auth/forgot-password';
        return axiosClient.post(url, data);
    },

    listUserByAdmin(data) {
        const url = '/user/search';
        return axiosClient.post(url, data);
    },

    registerPersonal(data) {
        const url = '/auth/register-personal-info';
        return axiosClient.post(url, data);
    },

    banAccount(data, id) {
        const url = '/user/' + id;
        return axiosClient.put(url, data);
    },

    unBanAccount(data, id) {
        const url = '/user/' + id;
        return axiosClient.put(url, data);
    },

    searchUser(email) {
        console.log(email);
        const params = {
            email: email.target.value
        }
        const url = '/user/searchByEmail';
        return axiosClient.get(url, { params });
    },

    sendNotification(data) {
        console.log(data);
        const url = '/auth/notifications';
        return axiosClient.post(url, data);
    },
}

export default userApi;