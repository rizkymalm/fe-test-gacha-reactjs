import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const loginUser = async (data: any) => {
    const response = await request.post('/auth/login', data);
    return response;
};
