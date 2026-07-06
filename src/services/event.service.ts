import Api from '../utils/api';

const request = new Api({
    baseUrl: import.meta.env.VITE_API_URL ?? '',
    xApiKey: '',
});

export const eventActive = async (token: string) => {
    const response = await request.get('/event/active', {
        token,
    });
    return response;
};

export const eventList = async (token: string, queries: any) => {
    const response = await request.get('/event/admin/list', {
        token,
        queries,
    });
    return response;
};

export const eventDetail = async (token: string, id: string) => {
    const response = await request.get(`/event/admin/detail/${id}`, {
        token,
    });
    return response;
};

export const eventItemExclude = async (
    token: string,
    queries: any,
    id: string
) => {
    const response = await request.get(`/event/admin/item/exclude/${id}`, {
        token,
        queries,
    });
    return response;
};

export const eventUpdateStatus = async (
    token: string,
    data: any,
    id: string
) => {
    const response = await request.patch(
        `/event/admin/update-status/${id}`,
        data,
        {
            token,
        }
    );
    return response;
};

export const eventUpdateItem = async (token: string, data: any, id: string) => {
    const response = await request.patch(`/event/update-item/${id}`, data, {
        token,
    });
    return response;
};

export const createEvent = async (token: string, data: any) => {
    const response = await request.post(`/event/admin/create`, data, {
        token,
    });
    return response;
};

// event item
export const eventItemAdd = async (token: string, data: any, id: string) => {
    const response = await request.post(
        `/event-item/admin/add-item/${id}`,
        data,
        {
            token,
        }
    );
    return response;
};

export const eventItemUpdateDropRate = async (
    token: string,
    data: any,
    id: string
) => {
    const response = await request.patch(
        `/event-item/admin/update/drop-rate/${id}`,
        data,
        {
            token,
        }
    );
    return response;
};

export const eventItemDeleteItem = async (token: string, id: string) => {
    const response = await request.delete(`/event-item/admin/delete/${id}`, {
        token,
    });
    return response;
};
