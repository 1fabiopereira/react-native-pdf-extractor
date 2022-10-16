import { Patterns } from '../../patterns';
import { Reducer, Match } from '../';

describe('Utils', () => {
  describe('Reducer', () => {
    it('Should return all patterns matches', () => {
      const line = 'My e-mail is name.lastname@mail.com';

      const pattern = new RegExp(Patterns.Common.Email[0], 'g');
      const result = Reducer(pattern)(`${line} ${line}`);

      expect(result?.length).toBe(2);
      expect(result?.[0]).toBe('name.lastname@mail.com');
    });

    it('Should transform pattern in global', () => {
      const line = 'My e-mail is name.lastname@mail.com';
      const text = `${line} ${line}`;
      const matchSpy = jest.spyOn(String.prototype, 'match');

      const pattern = new RegExp(Patterns.Common.Email[0]);
      const result = Reducer(pattern)(text);

      expect(matchSpy).toBeCalledTimes(1);
      expect(matchSpy).toBeCalledWith(/(\S+@\w+\.\w+)/g);
      expect(result?.length).toBe(2);
    });
  });

  describe('Match', () => {
    it('Should return all deduplicated patterns matches', () => {
      const line = 'My e-mail is name.lastname@mail.com';

      const pattern = new RegExp(Patterns.Common.Email[0], 'g');
      const result = Match(pattern, [`${line} ${line}`]);

      expect(result?.length).toBe(1);
      expect(result?.[0]).toBe('name.lastname@mail.com');
    });

    it('Should return empty string[] when data is undefined', () => {
      const pattern = new RegExp(Patterns.Common.Email[0]);

      const result = Match(pattern);

      expect(result?.length).toBe(0);
    });
  });
});
