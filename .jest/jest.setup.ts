import PdfExtractor from './__mocks__/PdfExtractor'

// all native modules
const mocks = {
    PdfExtractor
}

Object.keys(mocks).forEach((module => jest.doMock(module, () => mocks[module], { virtual: true })))

jest.mock('react-native', () => ({
    Platform: {
        OS: 'android',
        select: jest.fn((data: {android: any, ios: any}) => data.android)
    },
    NativeModules: mocks
}))

