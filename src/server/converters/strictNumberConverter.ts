import { ConverterService, Converter, IConverter, IDeserializer, ISerializer } from "@tsed/common";
import { BadRequest } from "ts-httpexceptions";

@Converter(Number)
export class StrictNumberConverter implements IConverter {
  deserialize<T>(data: string, target: any, baseType: T, deserializer: IDeserializer): String | Number | Boolean | void {
    if (typeof data !== 'number')
    throw new BadRequest(`'${data}' is not a valid number.`);
    return data;
  }

  serialize(object: String | Number | Boolean): any {
    return object;
  }
}