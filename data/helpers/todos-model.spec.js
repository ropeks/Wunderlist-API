const db = require('../dbConfig');
const Todos = require('./todos-model');

const dummyTodo = {
    "user_id": 1,
    "caption": "test todo",
    "description": "test test test test test test test test test",
    "due_date": [2019, 8, 2, 12],
    "completed": 1,
    "deleted": 1
};

const dummyTodo2 = {
    "user_id": 1,
    "caption": "test todo 2",
    "description": "test test test test test test test test test 2",
    "due_date": [2019, 8, 2, 12, 2],
    "completed": 0,
    "deleted": 0
};

describe('Todos Model', () => {

    beforeEach(async () => {
        await db('todos').truncate();
    });

    describe('add(userID, todo)', () => {

        it('should add new todo to the db', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo);
            const todos = await db('todos');
            expect(todos).toHaveLength(2);
        });

        it('should return added todo', async () => {
            await Todos.add(1, dummyTodo);
            const todos = await db('todos');
            expect(todos[0].caption).toBe(dummyTodo.caption);
        });

    });

    describe('get(userID)', () => {

       it('should return all todos', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo);
            const todos = await Todos.get(1);
            expect(todos).toHaveLength(2);
       });

    });

    describe('getById(userID, id)', () => {

        it('should return desired todo', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo2);
            const todo = await Todos.getById(1, 2);
            expect(todo.caption).toBe(dummyTodo2.caption);
        });

    });

    describe('remove(userID, id)', () => {

        it('should remove desired todo', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo2);
            const todo = await Todos.remove(1, 1);
            const todos = await db('todos');
            expect(todos).toHaveLength(1);
            expect(todos[0].caption).toBe(dummyTodo2.caption);
        });

    });

    describe('update(userID, id, changes)', () => {

        it('should update desired todo', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.update(1, 1, { ...dummyTodo2 });
            const todos = await db('todos');
            expect(todos[0].caption).toBe(dummyTodo2.caption);
        });

    });

    describe('getDeleted(userID)', () => {

        it('should display deleted todos', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo2);
            const deletedTodos = await Todos.getDeleted(1);
            expect(deletedTodos).toHaveLength(1);
        });

    });

    describe('getCompleted(userID)', () => {

        it('should display completed todos', async () => {
            await Todos.add(1, dummyTodo);
            await Todos.add(1, dummyTodo2);
            const completedTodos = await Todos.getCompleted(1);
            expect(completedTodos).toHaveLength(1);
        });


    });

});