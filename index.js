module.exports = function (source) {
    const regExp = /("use strict";)?([\s\S]*?)(React\.createElement\(.*\));$/;
    const [_, strictMode, requireModules, createElement] = regExp.exec(source);

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