import { Patterns } from '..';
import { Match } from '../Match'

describe('Match', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('match', () => {
    it('Should return matches when it exists', async () => {
      const data = [
        'this is a line with an email: mail@provider.com',
        'this e-mail mail@provider2.com is on 2nd line',
      ];

      const matches = await Match(Patterns.Common.Email[0], data);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0]).toBe('mail@provider.com');
      expect(matches[1]).toBe('mail@provider2.com');
    });

    it('Should remove duplicated matches and return when it exists', async () => {
      const data = [
        'this is a line with an email: mail@provider.com',
        'this e-mail mail@provider2.com is on 2nd line and is duplicated: mail@provider2.com',
      ];

      const matches = await Match(Patterns.Common.Email[0], data);

      expect(Array.isArray(matches)).toBe(true);
      expect(matches).toStrictEqual([
        'mail@provider.com',
        'mail@provider2.com',
      ]);
    });
  });
});
