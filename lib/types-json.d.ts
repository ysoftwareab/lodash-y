export interface JsonArray extends Array<JsonValue> {
}
export declare type JsonObject = {
    [key: string]: JsonValue;
};
export declare type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
