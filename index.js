module.exports = function (source) {
    const regExp = /(['"]use strict['"];?)?([\s\S]*?)(React\.createElement\([\s\S]*\));$/;
    const [_, strictMode, requireModules, createElement] = regExp.exec(source);
    
    // 1. About strict mode
    // `with` statement can't be used in strict mode.
    // we shouldn't use ES6 syntax, as the ES6 code is default in strict mode.

    // for example:
    // (1) we shouldn't use `import React from 'react';`
    // (2) we shouldn't use `module.exports = class extends React.component`

    // 2. About functional React component
    // There would be a problem occurs, if we exports a functional React component.
    // Somebody may accidentally add `refs` to our exporting component,
    // given the error: `Stateless function components cannot have refs.`

    // Therefore, we export a pseudo-functional component, 
    // it looks like a functional component but implemented by `React.createClass`.
    const target = `
        const React = require('react'); 
        ${requireModules}

        module.exports = React.createClass({
            render() {
                with(this.props) {
                    return (${createElement});
                }
            }
        });  
    `;

    return target;
};