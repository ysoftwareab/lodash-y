export interface JsonArray extends Array<JsonValue> {
}
export declare type JsonObject = {
    [key: string]: JsonValue;
};
export declare type JsonPrimitive = string | number | boolean | null;
export declare type JsonValue = JsonPrimitive | JsonArray | JsonObject;
