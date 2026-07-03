import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const itemList = async (token: string, queries: any) => {
    const response = await request.get('/item', {
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
