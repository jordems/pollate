import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { cli } from '../../util/cli.util';
import { AWSComponent } from './aws-abstract-component';

const dockerRunTemplate = (imageTag: string) => `
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "${imageTag}",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "8080"
    }
  ],
  "Volumes": [
    {
      "HostDirectory": "/var/app",
      "ContainerDirectory": "/opt/app"
    }
  ],
  "Logging": "/var/log/app"
}
`;

const ebConfigTemplate = (applicationName: string, region: string) => `
branch-defaults:
  master:
    environment: null
    group_suffix: null
deploy:
  artifact: .elasticbeanstalk/build.zip
global:
  application_name: ${applicationName}
  default_region: ${region}
  workspace_type: Application
`;

interface DeployParameters {
  environmentName: string;
  applicationName: string;
  applicationLabel: string;
  versionDescription: string;
  region: string;
  imageTag: string;
}

export class EBComponent extends AWSComponent {
  /**
   * Deploys the created ECR `imageTag` to the specified eb instance
   *
   * @param params - Parameters for elastic beanstalk deployment
   * @param imageTag - ECR image tag being deployed
   */
  async deploy(params: DeployParameters): Promise<void> {
    const { environmentName, applicationLabel, versionDescription } = params;

    await this.createBuildTemplate(params);

    // Start elastic beanstalk deployment
    console.log('Starting EB deployment');

    const result = await cli(
      `eb deploy ${environmentName} -l "${applicationLabel}" -m "${versionDescription}" | tee ./.elasticbeanstalk/output.txt`
    );

    console.log(result);

    // Hold until output states upload is finished
    await cli(
      'grep -c -q -i "update completed successfully" ./.elasticbeanstalk/output.txt'
    );
  }

  /**
   * Prepare the elastic beanstalk docker template to be sent when deploying
   *
   * @param imageTag
   */
  private async createBuildTemplate(params: DeployParameters): Promise<void> {
    const ebPath = join(cwd(), '.elasticbeanstalk');
    const ebBuildPath = join(ebPath, 'build');

    mkdirSync(ebPath);
    mkdirSync(ebBuildPath);

    writeFileSync(
      join(ebBuildPath, 'Dockerrun.aws.json'),
      Buffer.from(dockerRunTemplate(params.imageTag), 'utf-8')
    );

    writeFileSync(
      join(ebPath, 'config.yml'),
      Buffer.from(
        ebConfigTemplate(params.applicationName, params.region),
        'utf-8'
      )
    );

    await cli(
      'cd ./.elasticbeanstalk/build/ && zip -r ./../build.zip ./ && cd ./../../'
    );
  }
}
