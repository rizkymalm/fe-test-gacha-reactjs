import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const gachaRandom = async (token: string, queries: any) => {
    const response = await request.get('/gacha/random', {
        token,
        queries,
    });
    return response;
};
