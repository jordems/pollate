import { AWSComponent } from './aws-abstract-component';

export class CloudFrontComponent extends AWSComponent {
  private readonly cloudfront = new this.aws.CloudFront();

  /**
   * Invalidate the cache on the given cloudfront distribution.
   * This can only be done once every minute per distribution.
   *
   * @param distributionId - The cloudfront distribution id to invalidate
   */
  async invalidate(distributionId: string): Promise<void> {
    const callerReference = `${Math.round(Date.now() / 60000)}`;

    await this.cloudfront
      .createInvalidation({
        DistributionId: distributionId,
        InvalidationBatch: {
          Paths: { Quantity: 1, Items: ['/*'] },
          /**
           * Can't submit an invalidation request more than once a minute
           */
          CallerReference: callerReference,
        },
      })
      .promise();

    console.log(
      `Invalidated ${distributionId} with call reference ${callerReference}`
    );
  }
}
