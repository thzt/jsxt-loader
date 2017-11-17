This is a webpack loader, it can be used to load `.jsxt` file.

#### 1. what is a jsxt file

A `.jsxt` file is a jsx template file as follow, (like html)

It is usually used in the `render` function of a React component,

[babel](https://babeljs.io/) tranforms it to be `React.createElement(...)`.

For example: `page.jsxt`

```
<div>{T.message}</div>
```

The `jsxt-loader` will load this file to be a [functional React component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).

```
import React from 'react';

const Page = T => (
    <div>{T.message}</div>
);
```

`T` is the `namespace` option of `jsxt-loader`. (see the `webpack.config.js`)

#### 2. config the namespace

`webpack.config.js`,

```
...
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.jsxt$/,
                use: [
                    {
                        loader: 'jsxt-loader',
                        options: {
                            namespace: 'T'
                        }
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            ...
        ]
    },
    ...
};
```

#### 3. how to import a jsxt file

`index.jsx`,

```
import React from 'react';
import ReactDOM from 'react-dom';

// Page is a functional React component
import Page from './page.jsxt';

ReactDOM.render(
    <Page message="Hello world!" />,
    document.getElementById('root')
);
```

#### 4. pass React component as props

`index.jsx`,
```
import Greeting from './greeting.jsx';

ReactDOM.render(
    <Page message="Hello world!" Greeting={Greeting} />,
    document.getElementById('root')
);
```

`page.jsxt`,
```
<div>
    <T.Greeting />
    <span>{T.message}</span>
</div>
```