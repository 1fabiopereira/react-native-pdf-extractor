import { Chain } from '../core/Chain';
import { ChainLink } from '../core/ChainLink';

jest.mock('../core/ChainLink');

describe('Chain', () => {
  it('Should call exec method', async () => {
    const chain = new Chain([]);
    const chainSpy = jest.spyOn(chain, 'exec');

    await chain.exec('any-string');

    expect(chainSpy).toBeCalledTimes(1);
  });

  it('Should call ChainLink setNext on constructor', () => {
    const chainLinkOne = new ChainLink(jest.fn());
    const chainLinkTwo = new ChainLink(jest.fn());

    const chain = new Chain([chainLinkOne, chainLinkTwo]);
    const chainSpy = jest.spyOn(chain, 'exec');

    expect(chainLinkOne.setNext).toBeCalledTimes(1);
    expect(chainLinkOne.setNext).toBeCalledWith(chainLinkTwo);
    expect(chainSpy).toBeCalledTimes(0);
  });

  it('Should call ChainLink handle when exec runs', async () => {
    const chainLinkOne = new ChainLink(jest.fn());
    const chainLinkTwo = new ChainLink(jest.fn());

    const chain = new Chain([chainLinkOne, chainLinkTwo]);
    const chainSpy = jest.spyOn(chain, 'exec');

    await chain.exec('any-string');

    expect(chainLinkOne.handle).toBeCalledTimes(1);
    expect(chainSpy).toBeCalledTimes(1);
  });
});
