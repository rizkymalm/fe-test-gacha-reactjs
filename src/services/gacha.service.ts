import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const gachaRandom = async (token: string) => {
    const response = await request.get('/gacha/random', {
        token,
    });
    return response;
};
