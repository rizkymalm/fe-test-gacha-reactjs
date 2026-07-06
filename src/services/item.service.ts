import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const itemList = async (token: string, queries: any) => {
    const response = await request.get('/item/admin/list', {
        token,
        queries,
    });
    return response;
};

export const itemListGroup = async (token: string) => {
    const response = await request.get('/item/group', {
        token,
    });
    return response;
};
export const itemCreate = async (token: string, data: any) => {
    const response = await request.post('/item/admin/create', data, {
        token,
    });
    return response;
};
