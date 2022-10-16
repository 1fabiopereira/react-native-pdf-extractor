import { Patterns } from '../core/extractors/core/BaseExtractor';
import { Match } from '../Match';

describe('Match', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('match', () => {
    it('Should return empty array when data is empty', async () => {
      const matches = await Match(
        new RegExp(Patterns.Common.Email[0]),
        undefined
      );

      expect(matches).toStrictEqual([]);
    });

    it('Should return matches when it exists', async () => {
      const data = [
        'this is a line with an email: mail@provider.com',
        'this e-mail mail@provider2.com is on 2nd line',
      ];

      const matches = await Match(new RegExp(Patterns.Common.Email[0]), data);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0]).toBe('mail@provider.com');
      expect(matches[1]).toBe('mail@provider2.com');
    });

    it('Should not convert regex to global and return matches when regex have global flag', async () => {
      const data = [
        'this is a line with an email: mail@provider.com',
        'this e-mail mail@provider2.com is on 2nd line and is duplicated: mail@provider3.com',
      ];

      const matches = await Match(/(\S+@\w+\.\w+)/g, data);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches).toStrictEqual([
        'mail@provider.com',
        'mail@provider2.com',
        'mail@provider3.com',
      ]);
    });

    it('Should remove duplicated matches and return when it exists', async () => {
      const data = [
        'this is a line with an email: mail@provider.com',
        'this e-mail mail@provider2.com is on 2nd line and is duplicated: mail@provider2.com',
      ];

      const matches = await Match(new RegExp(Patterns.Common.Email[0]), data);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches).toStrictEqual([
        'mail@provider.com',
        'mail@provider2.com',
      ]);
    });
  });
});
