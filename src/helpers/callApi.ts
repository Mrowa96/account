import Config from '@/consts/config';

export default async function callApi(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${Config.app.api.url}${path}`, {
    headers: options?.body
      ? {
          'Content-Type': 'application/json',
        }
      : {},
    ...options,
  });
}
