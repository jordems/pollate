import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { AWSComponent } from './aws-abstract-component';

export class S3Component extends AWSComponent {
  private readonly s3 = new this.aws.S3({ apiVersion: '2006-03-01' });

  /**
   * Scans the directory to find all the files paths that exist under it.
   *
   * @param directory - The directory to get file paths under
   */
  private static getFilePaths(directory: string): string[] {
    const filePaths: string[] = [];

    for (const file of readdirSync(directory)) {
      const dirPath = join(directory, file);

      if (statSync(dirPath).isDirectory()) {
        filePaths.push(...S3Component.getFilePaths(dirPath));
      } else {
        filePaths.push(dirPath);
      }
    }

    return filePaths;
  }

  /**
   * Takes the files in the local `directory` and uploads them to the given S3 `bucket`
   *
   * @param bucket - The S3 bucket to upload the files too
   * @param directory - The local directory to get the files to upload
   */
  async uploadDirectoryToBucket(
    bucket: string,
    directory: string
  ): Promise<void> {
    const filePaths = S3Component.getFilePaths(directory);

    console.log(`Starting Upload from ${directory}=>s3://${bucket}`);
    await Promise.all(
      filePaths.map((filePath) =>
        this.uploadFileToBucket(bucket, directory, filePath)
      )
    );
    console.log(`Finished Upload from ${directory}=>s3://${bucket}`);
  }

  private async uploadFileToBucket(
    bucket: string,
    directory: string,
    filePath: string
  ): Promise<void> {
    const fileKey = filePath.substring(directory.length + 1);

    await this.s3
      .upload({
        Bucket: bucket,
        Key: fileKey,
        Body: readFileSync(filePath),
      })
      .promise();

    console.log(`\tUploaded: ${filePath}=>s3://${bucket}/${fileKey}`);
  }
}
