import { config } from 'dotenv';
import { CloudFrontComponent } from '../shared/aws-components/cloudfront-component';
import { getBuildPath } from '../shared/util/path.util';
import { S3Component } from './../shared/aws-components/s3-component';

config();

// Params
const buildPath = getBuildPath('pollate-ng');
const [bucket, distributionId] = [
  process.env.DEPLOY_POLLATE_NG_BUCKET,
  process.env.DEPLOY_POLLATE_NG_DISTRIBUTION_ID,
];

if (!(bucket && distributionId)) {
  throw new Error('Confirm all required environment variables exist');
}

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
