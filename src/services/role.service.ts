import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const roleList = async (token: string) => {
    const response = await request.get('/role/admin/list', {
        token,
    });
    return response;
};
