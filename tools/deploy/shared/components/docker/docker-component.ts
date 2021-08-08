import { cli } from '../../util/cli.util';

/**
 * Just abstracting docker commands to simple class to use
 * https://docs.docker.com/reference/
 */
export class DockerComponent {
  async build(tag: string, target: string, filePath: string): Promise<void> {
    await cli(
      `docker build . -t "${tag}" --target=${target} --memory=500m -f ${filePath}`
    );
  }

  async tag(tag1: string, tag2: string): Promise<void> {
    await cli(`docker tag ${tag1} ${tag2}`);
  }

  async push(tag: string): Promise<void> {
    await cli(`docker push ${tag}`);
  }

  async rmi(tag: string): Promise<void> {
    await cli(`docker rmi ${tag}`);
  }
}
