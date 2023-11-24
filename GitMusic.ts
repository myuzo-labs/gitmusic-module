import simpleGit from 'simple-git';

class GitMusic {
  private git: simpleGit.SimpleGit;

  constructor() {
    this.git = simpleGit();
  }

  async clone(repositoryUrl: string): Promise<void> {
    await this.git.clone(repositoryUrl);
  }

  async commit(message: string): Promise<string | Error> {
    const status = await this.git.status();
    if (status.isClean()) {
      return 'Nothing to commit';
    }
    try {
      const commitResult = await this.git.commit(message);
      return commitResult;
    } catch (error) {
      if (error.message.includes('conflict')) {
        throw new Error('Commit conflict');
      } else {
        throw error;
      }
    }
  }

  async push(branch: string): Promise<void> {
    await this.git.push('origin', branch);
  }

  async pull(branch: string): Promise<void> {
    await this.git.pull('origin', branch);
  }

  async merge(fromBranch: string, toBranch: string): Promise<void> {
    await this.git.checkout(toBranch);
    await this.git.merge([fromBranch]);
  }
}

export default GitMusic;
