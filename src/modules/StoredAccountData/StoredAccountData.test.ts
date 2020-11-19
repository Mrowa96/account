import StoredAccountData from '.';

const OriginalDateNow = Date.now;

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

describe('[Module] StoredAccountData', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2020-11-19T23:00:00Z').getTime());
  });

  beforeEach(() => {
    setItemSpy.mockClear();
    getItemSpy.mockClear();
    removeItemSpy.mockClear();
  });

  afterAll(() => {
    global.Date.now = OriginalDateNow;
  });

  it('should store email and last login date', () => {
    StoredAccountData.store('test@example.com');

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(
      'accountData',
      'eyJsYXN0TG9naW5UaW1lc3RhbXAiOjE2MDU4MjY4MDAwMDAsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSJ9',
    );
  });

  it('should return transformed data from storage', () => {
    getItemSpy.mockReturnValue('eyJsYXN0TG9naW5UaW1lc3RhbXAiOjE2MDU4MjY4MDAwMDAsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSJ9');

    expect(StoredAccountData.get()).toEqual({
      email: 'test@example.com',
      lastLoginDate: new Date(Date.now()),
    });
  });

  it('should return true if data is stored', () => {
    getItemSpy.mockReturnValue('dummy value');

    expect(StoredAccountData.has()).toBeTruthy();
  });

  it('should return false if data is not stored', () => {
    getItemSpy.mockReturnValue(null);

    expect(StoredAccountData.has()).toBeFalsy();
  });

  it('should clear stored value', () => {
    StoredAccountData.clear();

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(removeItemSpy).toHaveBeenCalledWith('accountData');
  });
});
