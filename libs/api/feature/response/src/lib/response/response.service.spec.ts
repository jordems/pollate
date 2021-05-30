import { QuestionModelService } from '@deb8/api/data-access/question';
import { ResponseModelService } from '@deb8/api/data-access/response';
import { Deb8GatewayService } from '@deb8/api/shared/gateway/deb8';
import { mockObjectId, mockQuestion, mockResponse } from '@deb8/testing';
import { Deb8OnUpsertResponse, Deb8WSEvent, Response } from '@deb8/type';
import { Test, TestingModule } from '@nestjs/testing';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  const responseModelService = Mock<ResponseModelService>();
  const questionModelService = Mock<QuestionModelService>();
  const deb8GatewayService = Mock<Deb8GatewayService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseService,
        { provide: ResponseModelService, useValue: responseModelService },
        { provide: QuestionModelService, useValue: questionModelService },
        { provide: Deb8GatewayService, useValue: deb8GatewayService },
      ],
    }).compile();

    service = module.get(ResponseService);

    mockReset(responseModelService);
    mockReset(questionModelService);
    mockReset(deb8GatewayService);
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

      expect(deb8GatewayService.emit).toHaveBeenCalledWith<
        [string, Deb8WSEvent, Deb8OnUpsertResponse]
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

      expect(deb8GatewayService.emit).toHaveBeenCalledWith<
        [string, Deb8WSEvent, Deb8OnUpsertResponse]
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
