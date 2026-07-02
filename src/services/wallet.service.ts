import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const walletAmount = async (token: string) => {
    const response = await request.get('/wallet/amount', {
        token,
    });
    return response;
};
