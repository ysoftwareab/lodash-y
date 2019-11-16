// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<JsonValue> {}

export type JsonObject = {
  [key: string]: JsonValue
};

export type JsonValue =
  string |
  number |
  boolean |
  null |
  JsonArray |
  JsonObject;
