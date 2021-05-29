import { MessageModelService } from '@deb8/api/data-access/chat';
import { UserModelService } from '@deb8/api/data-access/user';
import { Deb8GatewayService } from '@deb8/api/shared/gateway/deb8';
import { mockMessage, mockObjectId, mockUser } from '@deb8/testing';
import { Deb8OnMessageEvent, Deb8WSEvent, Message, User } from '@deb8/type';
import { Test, TestingModule } from '@nestjs/testing';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  const messageModelService = Mock<MessageModelService>();
  const userModelService = Mock<UserModelService>();
  const deb8GatewayService = Mock<Deb8GatewayService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: MessageModelService, useValue: messageModelService },
        { provide: UserModelService, useValue: userModelService },
        { provide: Deb8GatewayService, useValue: deb8GatewayService },
      ],
    }).compile();

    service = module.get(MessageService);

    mockReset(messageModelService);
    mockReset(userModelService);
    mockReset(deb8GatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const message = mockMessage();

  describe('create', () => {
    function mockFindUniqueUser(user: User = mockUser()) {
      userModelService.findUnique.mockResolvedValue(user);
    }
    function mockCreateMessage(message: Message) {
      messageModelService.create.mockResolvedValue(message);
    }

    beforeEach(() => {
      mockFindUniqueUser();
      mockCreateMessage(message);
    });

    it('should create a message on the question', async () => {
      const actual = await service.create(mockObjectId(), mockObjectId(), {
        text: 'Incorrect!',
      });

      expect(actual).toEqual(message);
    });

    it('should emit onMessage event to gateway', async () => {
      const questionId = mockObjectId();

      await service.create(questionId, mockObjectId(), {
        text: 'Incorrect!',
      });

      expect(deb8GatewayService.emit).toHaveBeenCalledWith<
        [string, Deb8WSEvent, Deb8OnMessageEvent]
      >(questionId, 'onMessage', {
        message: MessageModelService.toMinimal(message),
      });
    });
  });
});
