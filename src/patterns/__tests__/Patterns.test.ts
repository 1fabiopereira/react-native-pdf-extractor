import { Patterns } from '../';

describe('Patterns', () => {
  describe('Common', () => {
    describe('Email', () => {
      const cases = Patterns.Common.Email.map(
        (_, index): [string, string, boolean][] => {
          return [
            ['match', Patterns.Common.Email[index], true],
            ['not match', Patterns.Common.Email[index], false],
          ];
        }
      ).flat();
      it.each(cases)(
        'Should %s string with pattern %s',
        (_: string, __: string, value: boolean) => {
          const email = value
            ? 'name.lastname@provider.com'
            : 'email.provedor.com';
          const patterns = Patterns.Common.Email.map(
            (pattern) => new RegExp(pattern)
          );

          const matches =
            patterns
              .map((pattern: RegExp) => pattern.test(email))
              .filter((result: boolean) => result).length > 0;

          expect(matches).toBe(value);
        }
      );
    });
  });

  describe('Brazil', () => {
    describe('Bank Slip', () => {
      const formats = [
        '00000.00000 00000.000000 00000.000000 0 00000000000000',
        '000000000000 000000000000 000000000000 000000000000',
        '00000000000-0 00000000000-0 00000000000-0 00000000000-0',
      ];

      const wrongFormats = [
        '0000000000 00000.000000 00000.000000 0 00000000000000',
        '000000000000 000000000000 000000000000 00000000000',
        '00000000000-0 000000000000 00000000000-0 00000000000-0',
      ];

      const cases = Patterns.Brazil.BankSlip.map(
        (_, index): [string, string, boolean, number][] => {
          return [
            ['match', Patterns.Brazil.BankSlip[index], true, index],
            ['not match', Patterns.Brazil.BankSlip[index], false, index],
          ];
        }
      ).flat();

      it.each(cases)(
        'Should %s string with pattern %s',
        (_: string, __: string, value: boolean, index: number) => {
          const data = value ? formats[index] : wrongFormats[index];
          const patterns = Patterns.Brazil.BankSlip.map(
            (pattern) => new RegExp(pattern)
          );

          const matches =
            patterns
              .map((pattern: RegExp) => pattern.test(data))
              .filter((result: boolean) => result).length > 0;

          expect(matches).toBe(value);
        }
      );
    });
  });
});
