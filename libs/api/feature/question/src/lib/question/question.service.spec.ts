import { QuestionModelService } from '@deb8/api/data-access/question';
import { mockObjectId, mockQuestion } from '@deb8/testing';
import { Question } from '@deb8/type';
import { Test, TestingModule } from '@nestjs/testing';
import Mock, { mockReset } from 'jest-mock-extended/lib/Mock';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  const questionModelService = Mock<QuestionModelService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: QuestionModelService, useValue: questionModelService },
      ],
    }).compile();

    service = module.get(QuestionService);

    mockReset(questionModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const question = mockQuestion();

  function mockCreateQuestion(question: Question) {
    questionModelService.create.mockResolvedValue(question);
  }
  function mockGetQuestionByStubOnce(question: Question = mockQuestion()) {
    questionModelService.findByStub.mockResolvedValueOnce(question);
  }

  describe('create', () => {
    beforeEach(() => {
      mockCreateQuestion(question);
      mockGetQuestionByStubOnce(null);
    });

    it('should create a question on the question', async () => {
      const actual = await service.create(mockObjectId(), {
        question: '2+2?',
        responses: ['1', '2', '3'],
      });

      expect(actual).toEqual(question);
    });

    it('should generate a new stub if generated one is already used', async () => {
      mockGetQuestionByStubOnce(mockQuestion());

      await service.create(mockObjectId(), {
        question: '2+2?',
        responses: ['1', '2', '3'],
      });
    });
  });

  describe('getByStub', () => {
    beforeEach(() => {
      mockGetQuestionByStubOnce(question);
    });

    it('should get question when exists', async () => {
      const actual = await service.getByStub('stub');

      expect(actual).toEqual(question);
    });
  });
});
