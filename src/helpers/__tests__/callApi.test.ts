import callApi from '../callApi';

const originalFetch = globalThis.fetch;

describe('[Helper] callApi ', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should add content-type header if body is not empty', async () => {
    (globalThis.fetch as jest.Mock).mockReturnValue({ ok: true });

    const response = await callApi('/some-url', { body: 'whatever' });

    expect(response).toEqual({ ok: true });
    expect(globalThis.fetch as jest.Mock).toHaveBeenCalledWith('https://api.account.app/some-url', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'whatever',
    });
  });

  it('should pass parameters to fetch', async () => {
    (globalThis.fetch as jest.Mock).mockReturnValue({ ok: true });

    const response = await callApi('/some-url', { mode: 'cors' });

    expect(response).toEqual({ ok: true });
    expect(globalThis.fetch as jest.Mock).toHaveBeenCalledWith('https://api.account.app/some-url', {
      headers: {},
      mode: 'cors',
    });
  });

  it('should allow for parameters override', async () => {
    (globalThis.fetch as jest.Mock).mockReturnValue({ ok: true });

    const response = await callApi('/some-url', { headers: {}, body: 'payload' });

    expect(response).toEqual({ ok: true });
    expect(globalThis.fetch as jest.Mock).toHaveBeenCalledWith('https://api.account.app/some-url', {
      headers: {},
      body: 'payload',
    });
  });
});
