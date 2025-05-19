const enhancedResolver = (path, options) => {
  // Call the default resolver
  return options.defaultResolver(path, {
    ...options,
    // Force ESM packages to be treated as CommonJS
    packageFilter: pkg => {
      if (pkg.type === 'module') {
        pkg.type = 'commonjs';
        pkg.main = pkg.main || 'index.js';
      }
      return pkg;
    },
  });
};

module.exports = enhancedResolver; 