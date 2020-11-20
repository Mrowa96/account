import { FastifySchema, HTTPMethods, RouteHandler } from 'fastify';

export type RouteType = {
  method: HTTPMethods;
  url: string;
  schema: FastifySchema;
  handler: RouteHandler;
};
