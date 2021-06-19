import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionModelService } from '@pollate/api/data-access/question';
import { ResponseModelService } from '@pollate/api/data-access/response';
import { QuestionGatewayService } from '@pollate/api/shared/gateway/question';
import {
  CreateResponseRequest,
  CreateResponseResponse,
  UpdateResponseRequest,
  UpdateResponseResponse,
} from '@pollate/type';
import {
  alreadyHasResponse,
  responseDoesNotExistOnQuestion,
} from './response.copy';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseModelService: ResponseModelService,
    private readonly questionModelService: QuestionModelService,
    private readonly pollateGatewayService: QuestionGatewayService
  ) {}

  /**
   * Creates the response in the database
   * - Check that user doesn't already have a response on question
   * - Sends the response in real time to each client.
   * - Increments memoized values on question related to response
   *
   * @param questionId - Question the response is being created under
   * @param userId - User that's creating the response
   * @param dto - The details about what response was made
   */
  async create(
    questionId: string,
    userId: string,
    dto: CreateResponseRequest
  ): Promise<CreateResponseResponse> {
    if (
      await this.responseModelService.findUsersResponseOnQuestion(
        questionId,
        userId
      )
    ) {
      throw new BadRequestException(alreadyHasResponse);
    }

    await this.confirmQuestionHasResponse(questionId, dto.response);

    const [createdResponse] = await Promise.all([
      this.responseModelService.create({
        ...dto,
        questionId,
        userId,
      }),
      this.questionModelService.incrementResponseCount(
        questionId,
        dto.response
      ),
    ]);

    this.pollateGatewayService.emit(questionId, 'onUpsertResponse', {
      response: ResponseModelService.toMinimal(createdResponse),
    });

    return createdResponse;
  }

  /**
   * Updates the response in the database
   * - Emits an event to all clients to change the response.
   * - Handles necessary changes to memoized values on question
   *
   * @param questionId - Question the response is being created under
   * @param responseId - Response that is being updated
   * @param dto - The details about what is being changed about the response
   */
  async update(
    questionId: string,
    responseId: string,
    dto: UpdateResponseRequest
  ): Promise<UpdateResponseResponse> {
    await this.confirmQuestionHasResponse(questionId, dto.response);

    const oldResponse = await this.responseModelService.findOneRequired(
      responseId
    );

    const [updatedResponse] = await Promise.all([
      this.responseModelService.update(responseId, dto),
      this.questionModelService.changeResponseCount(
        questionId,
        oldResponse.response,
        dto.response
      ),
    ]);

    this.pollateGatewayService.emit(questionId, 'onUpsertResponse', {
      response: ResponseModelService.toMinimal(updatedResponse),
    });

    return updatedResponse;
  }

  /**
   * Validation step to confirm the response that is entered actually matches
   * one of the responses on the question.
   */
  private async confirmQuestionHasResponse(
    questionId: string,
    response: string
  ): Promise<void> {
    const question = await this.questionModelService.findById(questionId);

    if (!question.responses.find((r) => r === response)) {
      throw new BadRequestException(
        responseDoesNotExistOnQuestion(question.responses)
      );
    }
  }
}
