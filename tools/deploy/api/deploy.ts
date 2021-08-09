import { config } from 'dotenv';
import { EBComponent } from '../shared/components/aws/eb-component';
import { DockerFacade } from '../shared/components/docker/docker-facade';
import { validateEnv } from '../shared/util/validate.util';
import { cli } from './../shared/util/cli.util';

config();

// Params
const [registry, region, environmentName, applicationName] = validateEnv([
  process.env.AWS_ECR_REGISTRY,
  process.env.AWS_DEFAULT_REGION,
  process.env.DEPLOY_API_ENVIRONMENT,
  process.env.DEPLOY_API_APPLICATION,
]);

// Components
const dockerFacade = new DockerFacade({ region, registry });
const eb = new EBComponent();

const version = `proto${Math.round(Date.now() / 60000)}`;
// Deploy Logic
(async () => {
  console.log('Starting deployment of api');
  const gitSHA1 = (await cli('git rev-parse --verify HEAD')).trim();

  const buildTag = await dockerFacade.buildImage('api', version);

  const imageTag = await dockerFacade.pushImage(
    buildTag,
    'api',
    version,
    gitSHA1
  );

  await eb.deploy({
    environmentName,
    applicationName,
    applicationLabel: `proto-${gitSHA1}`,
    versionDescription: 'pollate prototype',
    imageTag,
    region,
  });

  console.log('Finished deployment of api');
})();
