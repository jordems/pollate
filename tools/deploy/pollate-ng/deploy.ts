import { config } from 'dotenv';
import { CloudFrontComponent } from '../shared/components/aws/cloudfront-component';
import { getBuildPath } from '../shared/util/path.util';
import { validateEnv } from '../shared/util/validate.util';
import { S3Component } from './../shared/components/aws/s3-component';

config();

// Params
const buildPath = getBuildPath('pollate-ng');
const [bucket, distributionId] = validateEnv([
  process.env.DEPLOY_POLLATE_NG_BUCKET,
  process.env.DEPLOY_POLLATE_NG_DISTRIBUTION_ID,
]);

// AWS Components
const s3 = new S3Component();
const cloudfront = new CloudFrontComponent();

// Deploy Logic
(async () => {
  console.log('Starting deployment of pollate-ng');

  // Upload Build to S3 Bucket
  await s3.uploadDirectoryToBucket(bucket, buildPath);

  // Invalidate Cloudfront (reset cache)
  await cloudfront.invalidate(distributionId);

  console.log('Finished deployment of pollate-ng');
})();
