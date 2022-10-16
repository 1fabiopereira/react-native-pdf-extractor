export interface Handler {
  setNext(handler: Handler): Handler;
  handle<T, U>(data: T, ctx: U): Promise<T>;
}

export type Patterns = string | string[];

export type TextResult = (string | null | undefined)[];

export type Action = <T, U>(data: T, ctx: U) => Promise<T>;

export type TransientObject = {
  duration?: string;
  isEncrypted?: boolean;
  pages?: number;
  patterns?: Patterns;
  text?: TextResult;
  uri?: string;
};

export interface PDFExtractor {
  getUri: () => Promise<string | undefined>;
  isEncrypted: () => Promise<boolean>;
  setUri: (uri: string) => Promise<string | undefined>;
  canIExtract: () => Promise<boolean>;
  getNumberOfPages: (password?: string) => Promise<number>;
  getText: (password?: string) => Promise<string | undefined>;
}

export interface DataExtractor {
  extract: (uri?: string, patterns?: Patterns) => Promise<TransientObject>;
  extractFromIntent: (patterns?: Patterns) => Promise<TransientObject>;
}
