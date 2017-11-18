### 1. what is jsxt

`jsxt` is the template part of a React component.

For example, there is a React component called `Page`,

```
class Page extends Component {
    ...

    render() {
        ...

        return <div>{message}</div>;
    }
}
```

The template part of `Page` is, `<div>{message}</div>`.

### 2. how to import jsxt

#### 2.1 import a jsx file as jsxt inline

Let's create a file `./page.jsx`:

```
<div>{message}</div>
```

Then we can import the `.jsx` file inline,

```
// use `jsxt-loader` and `babel-loader` in order
import Page from 'jsxt-loader!babel-loader!./page.jsx';
```

The source code in `./page.jsx` will be transformed to, 

```
const React = require('react');

module.exports = props => {
    with(props) {
        return React.createElement(
            "div",
            null,
            message
        );
    }
}
```

and will export a [functional React component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).

#### 2.2 import a jsxt file

In order to import a `.jsxt` file, 

we should config the webpack with `jsxt-loader` and `babel-loader` in `webpack.config.js`,

```
...
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.jsxt$/,
                use: ['jsxt-loader', 'babel-loader']
            },
            ...
        ]
    },
    ...
};
```

Then we can import a `.jsxt` file directly,

```
import Page from './page.jsxt';
```

### 3. React components in jsxt

If the `jsxt` contains another React componnet,

```
import Greeting from './greeting.jsx';

<div>
    <Greeting />
</div>
```

we can easily import `Greeting` at the head of the `jsxt` file.