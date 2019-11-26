// only in TypeScript 3.7+
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#more-recursive-type-aliases
// export type JsonArray = JsonValue[];
export interface JsonArray extends Array<JsonValue> {}

export type JsonObject =
  {
    [key: string]: JsonValue;
  };

export type JsonPrimitive =
  | string
  | number
  | boolean
  | null;

export type JsonValue =
  | JsonPrimitive
  | JsonArray
  | JsonObject;
