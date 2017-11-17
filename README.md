### jsxt-loader

This is a webpack loader, it can used to load `.jsxt` file.

#### 1. jsxt file

A `.jsxt` file is a jsx template file as follow, 

`page.jsxt`

```
<div>
    ...
    <T.Greeting message={T.text} />
    ...
</div>
```

The jsxt-loader will load this file to be a [functional React component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components) with `Greeting` and `text` as its props.

`T` is the `namespace` option of the loader.

#### 2. webpack config

`webpack.config.js`,

```
...
{
    test: /\.jsxt$/,
    use: [
        {
            loader: 'jsxt-loader',
            options: {
                // use T to find Greeting or text props.
                namespace: 'T'
            }
        },
        {
            loader: 'babel-loader'
        }
    ]
}
...
```

#### 3. import a jsxt file

`index.jsx`,

```
import React from 'react';
import ReactDOM from 'react-dom';

// load to be a functional React component
import Page from './page.jsxt';

// other component
import Other from './other.jsx';

// pass `Other` and `"Hello"` as prop values to `Page`.
ReactDOM.render(
    <Page Greeting={Other} text="Hello" />,
    document.getElementById('root')
);
```