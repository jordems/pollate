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

interface DeployParameters {
  environmentName: string;
  applicationLabel: string;
  versionDescription: string;
}

export class EBComponent extends AWSComponent {
  /**
   * Deploys the created ECR `imageTag` to the specified eb instance
   *
   * @param params - Parameters for elastic beanstalk deployment
   * @param imageTag - ECR image tag being deployed
   */
  async deploy(params: DeployParameters, imageTag: string): Promise<void> {
    const { environmentName, applicationLabel, versionDescription } = params;

    const ebPath = await this.createBuildTemplate(imageTag);

    // Start elastic beanstalk deployment
    await cli(
      `eb deploy ${environmentName}" -l "${applicationLabel}" -m "${versionDescription}" | tee ./.elasticbeanstalk/output.txt`
    );

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
  private async createBuildTemplate(imageTag: string): Promise<string> {
    const ebPath = join(cwd(), '.elasticbeanstalk');
    const ebBuildPath = join(ebPath, 'build');

    mkdirSync(ebPath);
    mkdirSync(ebBuildPath);

    writeFileSync(
      ebBuildPath,
      Buffer.from(dockerRunTemplate(imageTag), 'utf-8')
    );

    await cli('zip -r .elasticbeanstalk/build .elasticbeanstalk/');

    return ebPath;
  }
}
