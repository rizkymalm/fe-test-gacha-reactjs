import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const loginUser = async (data: any) => {
    const response = await request.post('/auth/login', data);
    return response;
};

export const refreshToken = async (token: string) => {
    const response = await request.post('/auth/refresh-token', undefined, {
        token,
    });
    return response;
};

export const authRole = async (token: string) => {
    const response = await request.get('/role/login', {
        token,
    });
    return response;
};
