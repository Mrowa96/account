import { FastifyReply, FastifyRequest } from 'fastify';
import getAccounts from '@server/storage/getAccounts';

export default async function loginHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const { email, password } = request.body as { email: string; password: string };

  const foundAccount = getAccounts().find(account => account.email === email);

  if (!foundAccount) {
    return reply.status(400).send({ errors: [{ field: 'email', message: 'Account with given email does not exist' }] });
  }

  if (foundAccount.password !== password) {
    return reply.status(400).send({ errors: [{ field: 'password', message: 'Invalid password' }] });
  }

  return reply.status(204).send();
}
