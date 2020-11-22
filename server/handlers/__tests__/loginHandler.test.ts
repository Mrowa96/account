import { FastifyInstance } from 'fastify';
import createServer from '@server/createServer';
import getAccounts from '@server/storage/getAccounts';

jest.mock('@server/storage/getAccounts');

describe('[POST] /login', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    (getAccounts as jest.Mock).mockClear();

    server = createServer();
  });

  afterEach(() => {
    server.close();
  });

  test.each([
    { email: 'test@test.pl', password: undefined },
    { email: undefined, password: 'test' },
    { email: undefined, password: undefined },
  ])('should reject request if parameters are not valid', async ({ email, password }) => {
    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email,
        password,
      },
    });
    const responseBody = JSON.parse(response.body);

    expect(responseBody.error).toEqual('Bad Request');
    expect(responseBody.message).toBeDefined();
    expect(response.statusCode).toEqual(400);
  });

  it('should return status 400 and error message when account with given email does not exist', async () => {
    (getAccounts as jest.Mock).mockReturnValue([
      {
        email: 'test@email.com',
        password: 'pass',
      },
    ]);

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test1@email.com',
        password: 'pass',
      },
    });
    const responseBody = JSON.parse(response.body);

    expect(responseBody.errors).toEqual([{ field: 'email', message: 'Account with given email does not exist.' }]);
    expect(response.statusCode).toEqual(400);
  });

  it('should return status 400 and error message when account with given password does not exist', async () => {
    (getAccounts as jest.Mock).mockReturnValue([
      {
        email: 'test@email.com',
        password: 'pass',
      },
    ]);

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test@email.com',
        password: 'invalid-pass',
      },
    });
    const responseBody = JSON.parse(response.body);

    expect(responseBody.errors).toEqual([{ field: 'password', message: 'Invalid password.' }]);
    expect(response.statusCode).toEqual(400);
  });

  it('should return status 400 and error message when account with given password does not exist', async () => {
    (getAccounts as jest.Mock).mockReturnValue([
      {
        email: 'test@email.com',
        password: 'pass',
      },
    ]);

    const response = await server.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test@email.com',
        password: 'pass',
      },
    });

    expect(response.body).toEqual('');
    expect(response.statusCode).toEqual(204);
  });
});
