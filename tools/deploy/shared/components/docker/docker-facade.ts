import { cli } from '../../util/cli.util';
import { getDockerFilePath } from '../../util/path.util';
import { DockerComponent } from './docker-component';

export interface DockerFacadeConfig {
  /**
   * The registry url for the ECR repo
   */
  registry: string;

  /**
   * The aws region of which is being used for this deployment
   */
  region: string;
}

export class DockerFacade {
  private readonly docker = new DockerComponent();
  private readonly config: DockerFacadeConfig;

  constructor(config: DockerFacadeConfig) {
    this.config = config;
  }

  /**
   * Builds the docker image of the app using it's Dockerfile
   * @returns buildTag - The tag of the docker build
   */
  async buildImage(app: string, version: string): Promise<string> {
    const buildTag = `${app}:${version}`;

    await this.docker.build(buildTag, app, getDockerFilePath(app));

    console.log(`Built: ${buildTag}`);

    return buildTag;
  }

  /**
   * Creates an image tag and pushes the docker image to the ecr
   *
   * @param buildTag - The tag of the built docker image
   */
  async pushImage(
    buildTag: string,
    app: string,
    version: string,
    gitSHA1: string
  ): Promise<string> {
    const imageTag = `${this.config.registry}/${app}:${version}-${gitSHA1}`;

    await this.authorizeDockerForECR();

    await this.docker.tag(buildTag, imageTag);

    await Promise.all([imageTag].map((tag) => this.docker.push(tag)));

    await this.docker.rmi(imageTag);

    console.log(`Pushed: ${imageTag}`);

    return imageTag;
  }

  private async authorizeDockerForECR() {
    const { region, registry } = this.config;
    await cli(
      `aws ecr get-login-password --region ${region} | docker login --username AWS --password-stdin ${registry}`
    );
  }
}
