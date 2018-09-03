import { ConverterService, Converter, IConverter, IDeserializer, ISerializer } from "@tsed/common";
import { BadRequest } from "ts-httpexceptions";

@Converter(String)
export class StrictStringConverter implements IConverter {
  deserialize<T>(data: string, target: any, baseType: T, deserializer: IDeserializer): String | Number | Boolean | void {
    // if (typeof data !== 'string')
    //   throw new BadRequest(`'${data}' is not a valid string.`);
    return data;
  }

  serialize(object: String | Number | Boolean): any {
    return object;
  }
}