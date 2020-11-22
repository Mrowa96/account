import StoredAccountData from '.';

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

describe('[Module] StoredAccountData', () => {
  beforeEach(() => {
    setItemSpy.mockClear();
    getItemSpy.mockClear();
    removeItemSpy.mockClear();
  });

  it('should store email', () => {
    StoredAccountData.store('test@example.com');

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith('accountData', 'eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ==');
  });

  it('should return transformed data from storage', () => {
    getItemSpy.mockReturnValue('eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ==');

    expect(StoredAccountData.get()).toEqual({
      email: 'test@example.com',
    });
  });

  it('should clear stored value', () => {
    StoredAccountData.clear();

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
    expect(removeItemSpy).toHaveBeenCalledWith('accountData');
  });
});
