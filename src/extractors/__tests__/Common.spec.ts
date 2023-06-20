import { Platform } from 'react-native';
import { BaseExtractor } from '../core/Base';
import { CommonExtractor } from '../core/Common';

const platformMock = (platform: 'android' | 'ios') => {
  Object.defineProperty(Platform, 'OS', { get: jest.fn(() => platform) });
};

const asyncMock = <T>(value: T) => jest.fn().mockResolvedValue(value);

describe('CommonExtractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('file', () => {
    it('Should call setUri', async () => {
      BaseExtractor.setUri = asyncMock('fake://return');
      const spy = jest.spyOn(BaseExtractor, 'setUri');

      await CommonExtractor.file({ uri: 'file://fake-uri' });

      expect(spy).toBeCalledTimes(1);
    });

    it('Should throw error when try setUri', async () => {
      BaseExtractor.setUri = asyncMock(null);
      const spy = jest.spyOn(BaseExtractor, 'setUri');

      try {
        await CommonExtractor.file({ uri: 'file://fake-uri' });
      } catch (error: any) {
        expect(spy).toBeCalledTimes(1);
        expect(error.message).toBe(
          "Invalid uri: 'file://fake-uri'. Cannot find the file."
        );
      }
    });

    it('Should call getUri when platform is Android', async () => {
      platformMock('android');
      const spy = jest.spyOn(BaseExtractor, 'getUri');

      try {
        await CommonExtractor.file({ uri: undefined });
      } catch (error: any) {
        expect(error.message).toBe('Could not perfom extraction without URI.');
      }

      expect(spy).toBeCalledTimes(1);
    });

    it('Should not call getUri when platform is iOS', async () => {
      platformMock('ios');

      const spy = jest.spyOn(BaseExtractor, 'getUri');

      try {
        await CommonExtractor.file({ uri: undefined });
      } catch { }

      expect(spy).toBeCalledTimes(0);
    });
  });

  describe('check', () => {
    it('Should call canIExtract', async () => {
      BaseExtractor.canIExtract = asyncMock(true);
      const spy = jest.spyOn(BaseExtractor, 'canIExtract');

      await CommonExtractor.check({});

      expect(spy).toBeCalledTimes(1);
    });

    it('Should throw error when call canIExtract', async () => {
      BaseExtractor.canIExtract = asyncMock(false);
      const spy = jest.spyOn(BaseExtractor, 'canIExtract');

      try {
        await CommonExtractor.check({ uri: undefined });
      } catch (error: any) {
        expect(error.message).toBe('You cannot continue with extraction.');
      }

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('encrypted', () => {
    it('Should call isEncrypted', async () => {
      BaseExtractor.isEncrypted = asyncMock(false);
      const spy = jest.spyOn(BaseExtractor, 'isEncrypted');

      await CommonExtractor.encrypted({});

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('pages', () => {
    it('Should call getNumberOfPages', async () => {
      BaseExtractor.getNumberOfPages = asyncMock(10);
      const spy = jest.spyOn(BaseExtractor, 'getNumberOfPages');

      await CommonExtractor.pages({ max: 10 });

      expect(spy).toBeCalledTimes(1);
    });

    it('Should call getNumberOfPages and throw error', async () => {
      BaseExtractor.getNumberOfPages = asyncMock(12);
      const spy = jest.spyOn(BaseExtractor, 'getNumberOfPages');

      try {
        await CommonExtractor.pages({ max: 10 });
      } catch (error: any) {
        expect(error.message).toBe(
          'This file exceeds maximum size of 10 pages.'
        );
      }

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('matches', () => {
    it('Should call getText', async () => {
      BaseExtractor.getText = asyncMock(['abc']);
      const spy = jest.spyOn(BaseExtractor, 'getText');

      await CommonExtractor.matches({ max: 1 });

      expect(spy).toBeCalledTimes(1);
    });

    it('Should call getTextWithPattern', async () => {
      BaseExtractor.getTextWithPattern = asyncMock(['abc']);
      const spy = jest.spyOn(BaseExtractor, 'getTextWithPattern');

      await CommonExtractor.matches({ max: 1, patterns: /[0-9]{2}/ });

      expect(spy).toBeCalledTimes(1);
    });
  });
});
