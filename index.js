module.exports = function (source) {
    const regExp = /("use strict";)?([\s\S]*?)(React\.createElement\([\s\S]*\));$/;
    const [_, strictMode, requireModules, createElement] = regExp.exec(source);

    // `with` statement can't be used in strict mode.
    const target = `
        const React = require('react'); 
        ${requireModules}

        module.exports = props => {
            with(props){
                return (${createElement});
            }    
        };    
    `;

    return target;
};