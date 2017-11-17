const { getOptions } = require('loader-utils');

// source: `"user strict"; React.createElement(...);`
// source.slice(15): `React.createElement(...);`
module.exports = function (source) {
    const options = getOptions(this);
    return `import React from 'react'; export default ${options.namespace} => ${source.slice(15)}`
};
