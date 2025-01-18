module.exports = {
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // This will allow `axios` to be transformed
    ],
  };