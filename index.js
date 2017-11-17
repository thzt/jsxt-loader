// params: `source`

// strict mode `source`: `"user strict"; React.createElement(...);`
// `source.slice(15)`: `React.createElement(...);`

// not strict mode `source`: `React.createElement(...);`
module.exports = function (source) {
    
    // some developers may use 'babel-plugin-transform-remove-strict-mode' to erase strict mode flag.
    // so we need to see whether the `source` code is in strict mode.
    const strictModeRegExp = /^"use strict";/;
    const isStrictMode = strictModeRegExp.test(source);
    const code = isStrictMode ? source.slice(15) : source;

    // note: 
    // here, we can't use ES6 modules, because ES6 modules are always parsed in strict mode, 
    // otherwise, there would be an error, `Module parse failed: 'with' in strict mode`.
    const target = `
        const React = require('react'); 

        module.exports = props => {
            with(props){
                return ${code}
            }    
        };
    `;

    return target;
};