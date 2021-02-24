import { TodoControllerResponse } from './../api-models/todo.model';
import { ApiController } from '../../../api/api-controller';

export class TodoController extends ApiController {
    static async getTodos(): Promise<TodoControllerResponse> {
        return this.getMethod({
            path: 'todos',
        });
    }
}
