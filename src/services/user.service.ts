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
