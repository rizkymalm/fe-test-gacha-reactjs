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
