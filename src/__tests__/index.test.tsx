import { hasPassword, getNumberOfPages, getText, getTextWithPattern } from '..';

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(({ android }) => android),
  },
  NativeModules: {
    PdfExtractor: {
      getNumberOfPages: jest.fn(),
      getText: jest.fn(),
      getTextWithPattern: jest.fn(),
      hasPassword: jest.fn(),
    },
  },
}));

const functions = new Map<string, any>([
  ['hasPassword', hasPassword],
  ['getNumberOfPages', getNumberOfPages],
  ['getText', getText],
  ['getTextWithPattern', getTextWithPattern],
]);

describe('Test React Native Pdf Extractor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Methods', () => {
    it.each([
      ['getNumberOfPages', 3, ['password']],
      ['getText', 7, [undefined]],
      ['getTextWithPattern', 1, [['[0-9]{2,4}', '[0-9]{2,4}'], 'password']],
      ['getTextWithPattern', 6, ['[0-9]{2,4}', 'password']],
      ['hasPassword', 10, [undefined]],
    ])(
      'Should call native modules PdfExtractor %s function %s times with params %s',
      async (fn, times, params) => {
        const executors = new Array(times)
          .fill(fn)
          .map((f) => functions.get(f));

        Promise.all(executors.map(async (exec) => await exec(...params))).then(
          () => {
            expect(fn).toHaveBeenCalledTimes(times);
            expect(fn).toHaveBeenLastCalledWith(...params);
          }
        );
      }
    );
  });
});
