import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as config from 'config';
import * as _ from 'lodash';
import { Timeouts } from '../shared/timeouts';
import { ApiRequest, ApiResponse, LastRequestData } from './request-interfaces';
import { DateTime } from 'luxon';

export class ApiController {
    private static instance: AxiosInstance;
    private static lastRequestData: LastRequestData[] = [];

    private static defaultConfig = {
        baseURL: config.get('apiUrl') as string,
        timeout: Timeouts.DefaultTimeout,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        withCredentials: true,
        validateStatus: (): boolean => true,
    };

    public static deleteLastRequests(): void {
        this.lastRequestData = [];
    }

    public static getLastRequests(): LastRequestData[] {
        return this.lastRequestData;
    }

    public static async commonHttpMethod(method: string, parameters: ApiRequest): Promise<ApiResponse> {
        const axiosConfig = this.mergeConfigs(this.defaultConfig, parameters.options);
        this.instance = axios.create(axiosConfig);

        let response;
        switch (method) {
            case 'GET':
                response = await this.instance.get(parameters.path, { params: parameters.queryParameters });
                this.lastRequestData.push({
                    request: { method: 'GET', path: parameters.path, queryParameters: parameters.queryParameters },
                    response: { status: response.status, body: response.data, responseTime: this.getCurrentTime() },
                });
                break;

            case 'POST':
                response = await this.instance.post(parameters.path, parameters.body);
                this.lastRequestData.push({
                    request: { method: 'POST', path: parameters.path, body: parameters.body },
                    response: { status: response.status, body: response.data, responseTime: this.getCurrentTime() },
                });
                break;
            case 'PUT':
                response = await this.instance.put(parameters.path, parameters.body);
                this.lastRequestData.push({
                    request: { method: 'PUT', path: parameters.path, body: parameters.body },
                    response: { status: response.status, body: response.data, responseTime: this.getCurrentTime() },
                });
                break;

            case 'DELETE':
                response = await this.instance.delete(parameters.path);
                this.lastRequestData.push({
                    request: { method: 'DELETE', path: parameters.path },
                    response: { status: response.status, body: response.data, responseTime: this.getCurrentTime() },
                });
                break;
        }

        return Object.assign(response, { body: response.data });
    }

    public static async getMethod(parameters: ApiRequest): Promise<ApiResponse> {
        return this.commonHttpMethod('GET', parameters);
    }

    public static async postMethod(parameters: ApiRequest): Promise<ApiResponse> {
        return this.commonHttpMethod('POST', parameters);
    }

    public static async putMethod(parameters: ApiRequest): Promise<ApiResponse> {
        return this.commonHttpMethod('PUT', parameters);
    }

    public static async deleteMethod(parameters: ApiRequest): Promise<ApiResponse> {
        return this.commonHttpMethod('DELETE', parameters);
    }

    private static mergeConfigs(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
        return _.assign({}, config1, config2);
    }

    private static getCurrentTime(): string {
        return DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
    }
}
