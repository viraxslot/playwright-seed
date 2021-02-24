import { ApiResponse } from '../../../api/request-interfaces.d';

export interface TodoControllerResponseBody {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoControllerResponse extends ApiResponse {
    body: TodoControllerResponseBody;
}
