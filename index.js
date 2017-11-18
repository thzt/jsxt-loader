module.exports = function (source) {
    const regExp = /^(['"]use strict['"];?)?([\s\S]*?)(.*\.createElement\([\s\S]*\));$/;
    const [_, strictMode, requireModules, createElement] = regExp.exec(source);

    // 1. About strict mode
    // `with` statement can't be used in strict mode.
    // we shouldn't use ES6 syntax, as the ES6 code is default in strict mode.

    // for example:
    // (1) we shouldn't use `import React from 'react';`
    // (2) we shouldn't use `module.exports = class extends React.component`

    // 2. About `create-react-class`
    // Because React 16 don't support `React.createClass` any more.
    // So we must use `create-react-class` module to create class on the fly.

    // 3. About functional React component
    // There would be a problem occurs, if we exports a functional React component.
    // Somebody may accidentally add `refs` to our exporting component,
    // given the error: `Stateless function components cannot have refs.`

    // Therefore, we export a pseudo-functional component, 
    // it looks like a functional component but implemented by `React.createClass`.
    const target = `
        ${requireModules}
        var createReactClass = require('create-react-class');

        module.exports = createReactClass({
            render() {
                with(this.props) {
                    return (${createElement});
                }
            }
        });  
    `;

    return target;
};