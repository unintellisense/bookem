import { ConverterService, Converter, IConverter, IDeserializer, ISerializer } from "@tsed/common";
import { BadRequest } from "ts-httpexceptions";

@Converter(Boolean)
export class StrictBooleanConverter implements IConverter {
  deserialize<T>(data: string, target: any, baseType: T, deserializer: IDeserializer): String | Number | Boolean | void {
    if (typeof data !== 'boolean')
    throw new BadRequest(`'${data}' is not a valid boolean.`);
    return data;
  }

  serialize(object: String | Number | Boolean): any {
    return object;
  }
}