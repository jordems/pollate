import AWS from 'aws-sdk';

export abstract class AWSComponent {
  private readonly awsInstance = AWS;

  protected get aws() {
    return this.awsInstance;
  }
}
