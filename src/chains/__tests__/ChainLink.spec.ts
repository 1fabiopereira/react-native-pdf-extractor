import { ChainLink } from '../core/ChainLink';

describe('ChainLink', () => {
  it('Should call setNext method', () => {
    const chainLinkOne = new ChainLink(jest.fn());
    const chainLinkTwo = new ChainLink(jest.fn());
    const nextSpy = jest.spyOn(chainLinkOne, 'setNext');

    chainLinkOne.setNext(chainLinkTwo);

    expect(nextSpy).toBeCalledTimes(1);
    expect(nextSpy).toBeCalledWith(chainLinkTwo);
  });

  it('Should call handle method', async () => {
    const chainLinkOne = new ChainLink(jest.fn());
    const chainLinkTwo = new ChainLink(jest.fn());
    const handleSpy = jest.spyOn(chainLinkOne, 'handle');

    chainLinkOne.setNext(chainLinkTwo);
    await chainLinkOne.handle(null);

    expect(handleSpy).toBeCalledTimes(1);
  });

  it('Should call action method', async () => {
    const action = jest.fn();
    const chainLink = new ChainLink(action);

    await chainLink.handle('any-string');

    expect(action).toBeCalledTimes(1);
    expect(action).toBeCalledWith('any-string');
  });

  it('Should throws error', async () => {
    const action = jest.fn(() => {
      throw new Error('Some error');
    });

    try {
      const chainLink = new ChainLink(action);
      await chainLink.handle('any-string');
    } catch (error: any) {
      expect(error).toHaveProperty('message');
      expect(error.message).toBe('Some error');
    }
  });
});
