export interface Handler {
  setNext(handler: Handler): Handler;
  handle<T>(data: T): Promise<T>;
}

export type Patterns = RegExp | RegExp[];

export type TextResult = (string | null | undefined)[];

export type Action = <T>(data: T) => Promise<T>;

export type Transient = {
  duration?: string;
  fromIntent?: boolean;
  isEncrypted?: boolean;
  pages?: number;
  patterns?: Patterns;
  text?: TextResult;
  uri?: string;
};

export type WithPassword<T = any> = T & { password?: string };

export type WithMaxSize<T = any> = T & { max: number };

export type ExtraTransient = WithMaxSize<WithPassword<Transient>>;

export interface PDFExtractor {
  getUri: () => Promise<string | undefined>;
  isEncrypted: () => Promise<boolean>;
  setUri: (uri: string) => Promise<string | undefined>;
  canIExtract: () => Promise<boolean>;
  getNumberOfPages: (password?: string) => Promise<number>;
  getText: (password?: string) => Promise<string | undefined>;
}

export interface DataExtractor {
  extract: (uri?: string, patterns?: Patterns) => Promise<Transient>;
  extractFromIntent: (patterns?: Patterns) => Promise<Transient>;
}
