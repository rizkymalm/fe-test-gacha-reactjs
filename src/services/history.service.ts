import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const historyList = async (token: string, queries: any) => {
    const response = await request.get('/history/admin/list', {
        token,
        queries,
    });
    return response;
};
