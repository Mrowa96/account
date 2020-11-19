import { HTTPMethods, RouteHandler, RouteShorthandOptions } from 'fastify';

export type RouteType = {
  method: HTTPMethods;
  url: string;
  options: RouteShorthandOptions;
  handler: RouteHandler;
};
