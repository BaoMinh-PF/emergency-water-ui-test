const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

module.exports = {
  images: {
    unoptimized: true, // needed for static export on GitHub Pages
  },
  ...(isGitHubPages && repoName
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};
