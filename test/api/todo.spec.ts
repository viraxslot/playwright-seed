import { TodoControllerResponseBody } from './../../src/modules/todo/api-models/todo.model';
import { expect } from 'chai';
import { get } from 'lodash';
import { TodoController } from './../../src/modules/todo/controller/todo.controller';

describe('API: todos suite', function () {
    it('should be possible to get all todos', async function () {
        const todosResponse = await TodoController.getTodos();
        expect(todosResponse.status).equals(200);

        const firstTodo: TodoControllerResponseBody = get(todosResponse, 'body.[0]');
        expect(firstTodo).not.undefined;
        expect(firstTodo.userId).equals(1);
        expect(firstTodo.id).equals(1);
        expect(firstTodo.title).equals('delectus aut autem');
        expect(firstTodo.completed).to.be.false;
    });
});
