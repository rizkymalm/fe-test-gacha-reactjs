import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const userProfile = async (token: string) => {
    const response = await request.get('/user/profile', {
        token,
    });
    return response;
};

export const userInventory = async (token: string, queries: any) => {
    const response = await request.get('/user/inventory', {
        token,
        queries,
    });
    return response;
};

export const userLatestInventory = async (token: string, queries: any) => {
    const response = await request.get('/user/inventory/latest', {
        token,
        queries,
    });
    return response;
};

// admin
export const userList = async (token: string, queries: any) => {
    const response = await request.get('/user/admin/list', {
        token,
        queries,
    });
    return response;
};

export const userDetail = async (token: string, user: string) => {
    const response = await request.get(`/user/admin/detail/${user}`, {
        token,
    });
    return response;
};

export const userCreate = async (token: string, data: any) => {
    const response = await request.post(`/user/admin/create`, data, {
        token,
    });
    return response;
};
