import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const interceptorResponseFn = (response: AxiosResponse<any>): AxiosResponse<any> => response;

const interceptorErrorFn = (error: any) => {
    if (error.response) {
        const status = error.response.status;

        if (status === 401) {
            window.location.href = '/sign-in/1';

            return Promise.reject({
                status,
                list: [{ msg: 'Unauthorized Error' }],
            });
        }

        if (status === 404) {
            return Promise.reject({
                status,
                list: [{ msg: 'Not found' }],
            });
        }

        if (status === 400) {
            if ('data' in error.response && 'validation' in error.response.data) {
                return Promise.reject({
                    status,
                    list: [{ msg: error.response.data.validation.body.message }],
                });
            }

            return Promise.reject({
                status,
                list: [{ msg: 'Bad Request' }],
            });
        }

        if (status === 403) {
            return Promise.reject({
                status,
                list: [{ msg: 'Forbidden' }],
            });
        }

        const response = {
            status: error.response.status,
            list: error.response.data.errors,
        };
        return Promise.reject(response);
    } else {
        const response = {
            status: 500,
            list: [{ msg: 'Something went wrong.' }],
        };
        return Promise.reject(response);
    }
};

class API {
    // private readonly BASE_URL: string = `${import.meta.env.VITE_APP_API_URL!}/api/v1`;
    private readonly BASE_URL: string = 'http://127.0.0.1:8080/api/v1';
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        const config: AxiosRequestConfig = { baseURL: this.BASE_URL };
        this.axiosInstance = axios.create(config);
        this.axiosInstance.interceptors.response.use(interceptorResponseFn, interceptorErrorFn);

        // this.addAccessToken(LS.readAccessToken());
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.addAccessToken(accessToken);
        }
    }

    public addAccessToken = (token?: string) => {
        this.axiosInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };

    public removeAccessToken = () => {
        this.axiosInstance.defaults.headers.common['Authorization'] = '';
    };

    public url = (path: string) => {
        if (path.startsWith('/')) return `${this.BASE_URL}${path}`;
        else return `${this.BASE_URL}/${path}`;
    };

    public get client() {
        return this.axiosInstance;
    }

    public get = <IRequest, IResponse>(url: string) => {
        return this.axiosInstance.get<IRequest, AxiosResponse<IResponse>>(url);
    };

    public post = <IRequest, IResponse>(url: string, payload: IRequest) => {
        return this.axiosInstance.post<IRequest, AxiosResponse<IResponse>>(url, payload);
    };

    public put = <IRequest, IResponse>(url: string, payload: IRequest) => {
        return this.axiosInstance.put<IRequest, AxiosResponse<IResponse>>(url, payload);
    };

    public delete = <IRequest, IResponse>(url: string) => {
        return this.axiosInstance.delete<IRequest, AxiosResponse<IResponse>>(url);
    };
}

export default new API();
