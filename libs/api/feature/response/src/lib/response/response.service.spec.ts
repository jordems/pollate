import { Test, TestingModule } from '@nestjs/testing';
import { QuestionModelService } from '@pollate/api/data-access/question';
import { ResponseModelService } from '@pollate/api/data-access/response';
import { QuestionGatewayService } from '@pollate/api/shared/gateway/question';
import { mockObjectId, mockQuestion, mockResponse } from '@pollate/testing';
import { Response } from '@pollate/type';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  const responseModelService = Mock<ResponseModelService>();
  const questionModelService = Mock<QuestionModelService>();
  const questionGatewayService = Mock<QuestionGatewayService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseService,
        { provide: ResponseModelService, useValue: responseModelService },
        { provide: QuestionModelService, useValue: questionModelService },
        { provide: QuestionGatewayService, useValue: questionGatewayService },
      ],
    }).compile();

    service = module.get(ResponseService);

    mockReset(responseModelService);
    mockReset(questionModelService);
    mockReset(questionGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const questionId = mockObjectId();
  const userId = mockObjectId();
  const response = mockResponse({ userId });

  function mockFindQuestionById() {
    questionModelService.findById.mockResolvedValue(
      mockQuestion({ responses: ['a', 'b', 'c'] })
    );
  }
  function mockFindUsersResponseOnQuestion() {
    responseModelService.findUsersResponseOnQuestion.mockResolvedValue(
      response
    );
  }
  function mockCreateResponse(response: Response) {
    responseModelService.create.mockResolvedValue(response);
  }
  function mockUpdateResponse(response: Response) {
    responseModelService.update.mockResolvedValue(response);
  }
  function mockFindResponseSuccess(response: Response) {
    responseModelService.findOneRequired.mockResolvedValue(response);
  }
  function mockFindResponseFailed() {
    responseModelService.findOneRequired.mockRejectedValue(null);
  }

  describe('create', () => {
    beforeEach(() => {
      mockCreateResponse(response);
      mockFindQuestionById();
    });

    it('should create a response on the question', async () => {
      const actual = await service.create(questionId, userId, {
        response: 'b',
      });

      expect(actual).toEqual(response);
    });

    it('should emit created response to gateway', async () => {
      await service.create(questionId, userId, {
        response: 'b',
      });

      expect(questionGatewayService.emit).toHaveBeenCalledWith<
        Parameters<QuestionGatewayService['emit']>
      >(questionId, 'onUpdateResponseDelta', {
        responsesDeltas: [{ response: 'b', amountDelta: 1 }],
        changedUserResponse: [{ userId, response: 'b' }],
      });
    });

    it('should increment memoized response on question', async () => {
      await service.create(questionId, userId, {
        response: 'b',
      });

      expect(questionModelService.incrementResponseCount).toHaveBeenCalledWith<
        Parameters<QuestionModelService['incrementResponseCount']>
      >(questionId, 'b');
    });

    it('should throw error if response is not on the question', () => {
      return expect(
        service.create(questionId, userId, {
          response: 'd',
        })
      ).rejects.toThrowError();
    });

    it('should throw error if user already has response on the question', () => {
      mockFindUsersResponseOnQuestion();

      return expect(
        service.create(questionId, userId, {
          response: 'a',
        })
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockFindResponseSuccess(response);
      mockUpdateResponse(response);
      mockFindQuestionById();
    });

    it('should update a response on the question', async () => {
      const actual = await service.update(questionId, response._id, {
        response: 'b',
      });

      expect(actual).toEqual(response);
    });

    it('should emit update response to gateway', async () => {
      await service.update(questionId, response._id, {
        response: 'b',
      });

      expect(questionGatewayService.emit).toHaveBeenCalledWith<
        Parameters<QuestionGatewayService['emit']>
      >(questionId, 'onUpdateResponseDelta', {
        responsesDeltas: [
          { response: response.response, amountDelta: -1 },
          { response: 'b', amountDelta: 1 },
        ],
        changedUserResponse: [{ userId, response: 'b' }],
      });
    });

    it('should change memoized response on question', async () => {
      await service.update(questionId, response._id, {
        response: 'b',
      });

      expect(questionModelService.changeResponseCount).toHaveBeenCalledWith<
        Parameters<QuestionModelService['changeResponseCount']>
      >(questionId, response.response, 'b');
    });

    it('should throw error if response is not on the question', () => {
      return expect(
        service.update(questionId, userId, {
          response: 'd',
        })
      ).rejects.toThrowError();
    });
  });
});
