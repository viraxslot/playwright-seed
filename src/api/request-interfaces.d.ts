import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiRequest {
    path?: string;
    body?: Record<string, any>;
    queryParameters?: Record<string, any>;
    options?: AxiosRequestConfig;
}

export type ApiResponse = AxiosResponse & { body: any };

// interfaces for the reporting

export interface RequestData {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
    path: string;
    body?: Record<string, any>;
    queryParameters?: Record<string, any>;
}

export interface ResponseData {
    status: number;
    body: Record<string, any>;
    responseTime?: string;
}

export interface LastRequestData {
    request: RequestData;
    response: ResponseData;
}
