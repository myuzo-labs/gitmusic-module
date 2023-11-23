const simpleGit = require('simple-git');

// GitMusic integrates Git functionality for music projects.
class GitMusic {
  constructor() {
    this.git = simpleGit();
  }

  async clone(repositoryUrl) {
    // Clones a Git repository
    await this.git.clone(repositoryUrl);
  }

  async commit(message) {
    // Commits changes with a message
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

  async push(branch) {
    // Pushes changes to a specified branch
    await this.git.push('origin', branch);
  }

  async pull(branch) {
    // Pulls changes from a specified branch
    await this.git.pull('origin', branch);
  }

  async merge(fromBranch, toBranch) {
    // Merges one branch into another
    await this.git.checkout(toBranch);
    await this.git.merge([fromBranch]);
  }
}

module.exports = GitMusic;
