import { Test, TestingModule } from '@nestjs/testing';
import { QuestionModelService } from '@pollate/api/data-access/question';
import { mockObjectId, mockQuestion } from '@pollate/testing';
import { Question } from '@pollate/type';
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

  type GeneratedQuestionFields = Required<Pick<Question, '_id' | 'createdAt'>>;

  const userId = mockObjectId();
  const question = mockQuestion();
  const generatedQuestionFields: GeneratedQuestionFields = {
    _id: mockObjectId(),
    createdAt: new Date(),
  };

  function mockCreateQuestion() {
    questionModelService.create.mockImplementation((question) =>
      Promise.resolve({ ...question, ...generatedQuestionFields })
    );
  }
  function mockGetQuestionByStub(question: Question = mockQuestion()) {
    questionModelService.findByStub.mockResolvedValue(question);
  }

  describe('create', () => {
    it.each<[string, Partial<Question>]>([
      [
        'with a stub',
        {
          stub: expect.stringMatching(/^[A-Za-z0-9_-]{10}$/),
        },
      ],
      [
        'with the userId',
        {
          userId,
        },
      ],
      [
        'with default memoized values',
        {
          memoized: {
            messageCount: 0,
            responseCount: 0,
            activeResponses: {
              '1': 0,
              '2': 0,
              '3': 0,
              '4': 0,
            },
          },
        },
      ],
      [
        'with requested question and responses',
        {
          question: '2+2?',
          responses: ['1', '2', '3', '4'],
        },
      ],
      ['with generated fields', generatedQuestionFields],
    ])('should create a question %s', async (_, expectContaining) => {
      mockCreateQuestion();

      const actual = await service.create(userId, {
        question: '2+2?',
        responses: ['1', '2', '3', '4'],
      });

      expect(actual).toEqual(expect.objectContaining(expectContaining));
    });
  });

  describe('getByStub', () => {
    beforeEach(() => {
      mockGetQuestionByStub(question);
    });

    it('should get question when exists', async () => {
      const actual = await service.getByStub('stub');

      expect(actual).toEqual(question);
    });
  });
});
