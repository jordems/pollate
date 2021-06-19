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
  const response = mockResponse();

  function mockFindQuestionById() {
    questionModelService.findById.mockResolvedValue(
      mockQuestion({ responses: ['a', 'b', 'c'] })
    );
  }
  function mockCreateResponse(response: Response) {
    responseModelService.create.mockResolvedValue(response);
  }
  function mockUpdateResponse(response: Response) {
    responseModelService.update.mockResolvedValue(response);
  }

  describe('create', () => {
    beforeEach(() => {
      mockCreateResponse(response);
      mockFindQuestionById();
    });

    it('should create a response on the question', async () => {
      const actual = await service.create(questionId, mockObjectId(), {
        response: 'b',
      });

      expect(actual).toEqual(response);
    });

    it('should emit created response to gateway', async () => {
      await service.create(questionId, mockObjectId(), {
        response: 'b',
      });

      expect(questionGatewayService.emit).toHaveBeenCalledWith<
        Parameters<QuestionGatewayService['emit']>
      >(questionId, 'onUpsertResponse', {
        response: ResponseModelService.toMinimal(response),
      });
    });

    it('should throw error if response is not on the question', () => {
      return expect(
        service.create(questionId, mockObjectId(), {
          response: 'd',
        })
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockUpdateResponse(response);
      mockFindQuestionById();
    });

    it('should update a response on the question', async () => {
      const actual = await service.update(questionId, mockObjectId(), {
        response: 'b',
      });

      expect(actual).toEqual(response);
    });

    it('should emit update response to gateway', async () => {
      await service.update(questionId, mockObjectId(), {
        response: 'b',
      });

      expect(questionGatewayService.emit).toHaveBeenCalledWith<
        Parameters<QuestionGatewayService['emit']>
      >(questionId, 'onUpsertResponse', {
        response: ResponseModelService.toMinimal(response),
      });
    });

    it('should throw error if response is not on the question', () => {
      return expect(
        service.update(questionId, mockObjectId(), {
          response: 'd',
        })
      ).rejects.toThrowError();
    });
  });
});
