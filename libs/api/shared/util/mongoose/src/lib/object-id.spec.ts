import { validate } from 'class-validator';
import * as mongoose from 'mongoose';
import { IsObjectId, toObjectId } from './object-id';

describe('toObjectId', () => {
  it('should successfuly convert to objectid if valid string', () => {
    expect(toObjectId('4edd40c86762e0fb12000003')).toEqual(
      expect.any(mongoose.Types.ObjectId)
    );
  });
});

describe('IsObjectId', () => {
  class TestValidator {
    @IsObjectId()
    _id: mongoose.ObjectId;
  }
  const testValidator = new TestValidator();

  it('should successfuly validate if input is a valid objectid', async () => {
    const validationResponse = await validate(
      Object.assign(testValidator, { _id: '4edd40c86762e0fb12000003' })
    );

    expect(validationResponse.length).toEqual(0);
  });

  it('should have a violation if input is not a valid objectid', async () => {
    const validationResponse = await validate(
      Object.assign(testValidator, { _id: 'non-valid' })
    );

    expect(validationResponse.length).toEqual(1);
  });
});
