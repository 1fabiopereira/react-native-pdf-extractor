import type { ChainLink } from './ChainLink';

export class Chain {
  private readonly chain?: ChainLink;

  constructor(nodes: ChainLink[]) {
    if (nodes.length) {
      const entryPoint = nodes.shift() as ChainLink;

      const reducer = (chain: ChainLink, handler: ChainLink, index: number) => {
        const next = chain.setNext(handler) as ChainLink;
        return index === nodes.length - 1 ? entryPoint : next;
      };

      this.chain = nodes.reduce(reducer, entryPoint);
    }
  }

  async exec<T>(data?: T): Promise<any> {
    if (this.chain) {
      return await this.chain.handle(data);
    }

    return await Promise.resolve(null);
  }
}
