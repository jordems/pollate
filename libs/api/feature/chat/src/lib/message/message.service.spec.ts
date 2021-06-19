import { Test, TestingModule } from '@nestjs/testing';
import { MessageModelService } from '@pollate/api/data-access/chat';
import { UserModelService } from '@pollate/api/data-access/user';
import { QuestionGatewayService } from '@pollate/api/shared/gateway/question';
import { mockMessage, mockObjectId, mockUser } from '@pollate/testing';
import { Message, User } from '@pollate/type';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  const messageModelService = Mock<MessageModelService>();
  const userModelService = Mock<UserModelService>();
  const questionGatewayService = Mock<QuestionGatewayService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: MessageModelService, useValue: messageModelService },
        { provide: UserModelService, useValue: userModelService },
        { provide: QuestionGatewayService, useValue: questionGatewayService },
      ],
    }).compile();

    service = module.get(MessageService);

    mockReset(messageModelService);
    mockReset(userModelService);
    mockReset(questionGatewayService);
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

      expect(questionGatewayService.emit).toHaveBeenCalledWith<
        Parameters<QuestionGatewayService['emit']>
      >(questionId, 'onMessage', {
        message: MessageModelService.toMinimal(message),
      });
    });
  });
});
