import { ObjectId } from 'bson';

export function mockObjectId(): string {
  const objectId = new ObjectId();

  return objectId.toHexString();
}
