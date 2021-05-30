import { Test, TestingModule } from '@nestjs/testing';
import { UserModelService } from '@pollate/api/data-access/user';
import { mockUser } from '@pollate/testing';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const userModelService = Mock<UserModelService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserModelService, useValue: userModelService },
      ],
    }).compile();

    service = module.get(UserService);

    mockReset(userModelService);
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
        uid: '1234567890123456789012345678',
        name: 'Timmo',
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
        name: 'b',
      });

      expect(actual).toEqual(user);
    });
  });
});
