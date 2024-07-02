const http = require('http');
const { v4: uuidv4 } = require('uuid');

const server = require('../components/routeHandlers');
const { setupInterval, clearInterval } = require('../components/middlewares/rateLimitter');
const port = 3000;
const baseUrl = `http://localhost:${port}`;

describe('Todo API', () => {
  let createdTodoId;
  let globalServer;

  beforeAll((done) => {
    jest.useFakeTimers();
    setupInterval();
    if (globalServer) {
        globalServer.close();
    }
    globalServer = server.listen(3000);
    done()
  });
  afterEach(() => {
    clearInterval();
  });

  afterAll((done) => {
    jest.clearAllTimers();
    globalServer.close(done);
  });

  const todo = {
    title: 'New Todo',
    description: 'A new todo item',
  };

  test('should create a new todo item', (done) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(`${baseUrl}/todos`, options, (res) => {
      expect(res.statusCode).toBe(201);
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        expect(response.id).toBeTruthy();
        createdTodoId = response.id;
        done();
      });
    });

    req.write(JSON.stringify(todo));
    req.end();
  });

  test('should retrieve all todo items', (done) => {
    http.get(`${baseUrl}/todos`, (res) => {
      expect(res.statusCode).toBe(200);
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const todos = JSON.parse(data);
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBe(1);
        expect(todos[0].title).toBe(todo.title);
        expect(todos[0].description).toBe(todo.description);
        done();
      });
    });
  });

  test('should retrieve a specific todo item by ID', (done) => {
    http.get(`${baseUrl}/todos/${createdTodoId}`, (res) => {
      expect(res.statusCode).toBe(200);
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const todo = JSON.parse(data);
        expect(todo.id).toBe(createdTodoId);
        done();
      });
    });
  });

  test('should update a specific todo item', (done) => {
    const updatedTodo = {
      title: 'Updated Todo',
      description: 'An updated todo item',
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(
      `${baseUrl}/todos/${createdTodoId}`,
      options,
      (res) => {
        expect(res.statusCode).toBe(200);
        done();
      }
    );

    req.write(JSON.stringify(updatedTodo));
    req.end();
  });

  test('should delete a specific todo item', (done) => {
    const options = {
      method: 'DELETE',
    };

    const req = http.request(
      `${baseUrl}/todos/${createdTodoId}`,
      options,
      (res) => {
        expect(res.statusCode).toBe(200);
        done();
      }
    );

    req.end();
  });

  test('should return 404 for a non-existent todo item', (done) => {
    http.get(`${baseUrl}/todos/${uuidv4()}`, (res) => {
      expect(res.statusCode).toBe(404);
      done();
    });
  });

  test('Exception endpoint returns a 404, with error', function(done) {
    http.get(`${baseUrl}/user`, (res) => {
      expect(res.statusCode).toBe(404);
      expect(res.headers['x-error-message']).toBe("User not found");
      done();
    });
  });
});