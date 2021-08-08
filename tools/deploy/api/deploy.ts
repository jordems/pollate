import { config } from 'dotenv';
import { EBComponent } from '../shared/components/aws/eb-component';
import { DockerFacade } from '../shared/components/docker/docker-facade';
import { validateEnv } from '../shared/util/validate.util';
import { cli } from './../shared/util/cli.util';

config();

// Params
const [registry, region, environmentName] = validateEnv([
  process.env.AWS_ECR_REGISTRY,
  process.env.AWS_DEFAULT_REGION,
  process.env.DEPLOY_API_ENVIRONMENT,
]);

// Components
const dockerFacade = new DockerFacade({ region, registry });
const eb = new EBComponent();

// Deploy Logic
(async () => {
  console.log('Starting deployment of api');
  const gitSHA1 = await cli('git rev-parse --verify HEAD');

  const buildTag = await dockerFacade.buildImage('api', 'proto');

  const imageTag = await dockerFacade.pushImage(buildTag, 'proto', gitSHA1);

  await eb.deploy(
    {
      environmentName,
      applicationLabel: `proto-${gitSHA1}`,
      versionDescription: 'pollate prototype',
    },
    imageTag
  );

  console.log('Finished deployment of api');
})();
