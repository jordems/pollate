import { UserModelService } from '@pollate/api/data-access/user';
import { mockUser } from '@pollate/testing';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { UserService } from './user.service';

describe('UserService', () => {
  const userModelService = Mock<UserModelService>();
  const nameGeneratorService = Mock<NameGeneratorService>();

  const service = new UserService(userModelService, nameGeneratorService);

  beforeEach(async () => {
    mockReset(userModelService);
    mockReset(nameGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const user = mockUser();

  function mockCreateUser() {
    userModelService.create.mockResolvedValue(user);
  }
  function mockUpdateUser() {
    userModelService.update.mockResolvedValue(user);
  }

  describe('create', () => {
    beforeEach(() => {
      mockCreateUser();
    });

    it('should create a user', async () => {
      const actual = await service.create({
        username: 'Timmo',
      });

      expect(actual).toEqual(user);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockUpdateUser();
    });

    it('should update a user', async () => {
      const actual = await service.update(user._id, {
        username: 'b',
      });

      expect(actual).toEqual(user);
    });
  });
});
