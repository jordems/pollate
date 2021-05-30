import { QuestionModelService } from '@deb8/api/data-access/question';
import { ResponseModelService } from '@deb8/api/data-access/response';
import { Deb8GatewayService } from '@deb8/api/shared/gateway/deb8';
import {
  CreateResponseRequest,
  CreateResponseResponse,
  UpdateResponseRequest,
  UpdateResponseResponse,
} from '@deb8/type';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseModelService: ResponseModelService,
    private readonly questionModelService: QuestionModelService,
    private readonly deb8GatewayService: Deb8GatewayService
  ) {}

  /**
   * Creates the response in the database, aswell as sending the response
   * in real time to each client.
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
    await this.confirmQuestionHasResponse(questionId, dto.response);

    const createdResponse = await this.responseModelService.create({
      ...dto,
      questionId,
      userId,
    });

    this.deb8GatewayService.emit(questionId, 'onUpsertResponse', {
      response: ResponseModelService.toMinimal(createdResponse),
    });

    return createdResponse;
  }

  /**
   * Updates the response in the database, and emits an event to all clients
   * to change the response.
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

    const updatedResponse = await this.responseModelService.update(
      responseId,
      dto
    );

    this.deb8GatewayService.emit(questionId, 'onUpsertResponse', {
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
      throw new BadRequestException({
        error: `Response entered is invalid, must be one of [${question.responses}]`,
      });
    }
  }
}
