const mime = require('mime-types');

module.exports = {
  // Your existing webpack configuration goes here

  // Add or modify the module rules
  module: {
    rules: [
      {
        test: /\.json$/, // This rule will apply to JSON files
        type: 'javascript/auto', // Specify the MIME type for JSON files
      },
      // ...other rules
    ],
  },
};
