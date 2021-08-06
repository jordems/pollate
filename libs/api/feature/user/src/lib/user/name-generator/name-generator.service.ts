import { Injectable } from '@nestjs/common';
import { adjectives } from './data/adjective';
import { nouns } from './data/noun';

@Injectable()
export class NameGeneratorService {
  private static pickRandomElementInArray<T>(arr: T[]): T {
    const randomIndex = Math.round(Math.random() * arr.length);

    return arr[randomIndex];
  }

  getUniqueName(): string {
    const randomName = `${NameGeneratorService.pickRandomElementInArray(
      adjectives
    )}-${NameGeneratorService.pickRandomElementInArray(nouns)}`;

    return randomName;
  }
}
