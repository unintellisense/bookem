import { ConverterService, Converter, IConverter, IDeserializer, ISerializer } from "@tsed/common";
import { BadRequest } from "ts-httpexceptions";

@Converter(Number)
export class StrictNumberConverter implements IConverter {
  deserialize<T>(data: string, target: any, baseType: T, deserializer: IDeserializer): String | Number | Boolean | void {
    switch (typeof data) {
      case 'number':
        return data;

      case 'string':
        let numberVal = Number.parseInt(data);
        if (isNaN(numberVal))
          throw new BadRequest(`'${data}' is not a valid number.`);
        return numberVal;

      default:
        throw new BadRequest(`'${data}' is not a valid number.`);
    }
  }

  serialize(object: String | Number | Boolean): any {
    return object;
  }
}