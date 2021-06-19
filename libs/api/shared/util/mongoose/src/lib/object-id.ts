import { registerDecorator } from 'class-validator';
import * as mongoose from 'mongoose';

/**
 * Converts a string version of an ObjectId to a ObjectId type
 * - Assumes input is valid
 *
 * @param id - String version of an ObjectId
 * @returns - ObjectId version of id
 */
export function isObjectId(id: any): id is string {
  return mongoose.isValidObjectId(id);
}

/**
 * Class-validator to confirm the specified type is infact a string that can be converted to an ObjectId
 */
export function IsObjectId() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string): boolean {
          return mongoose.isValidObjectId(value);
        },
        defaultMessage(args): string {
          return `'${args.value}' is not an object id on property '${args.property}'`;
        },
      },
    });
  };
}
