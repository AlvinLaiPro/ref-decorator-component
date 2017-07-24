# ref-decorator-component
解决react component被装饰器装饰时ref属性丢失
## Usage

First, install the package using npm:
```shell
    npm install ref-decorator-component --save
```

Then, require the package and use it like so:
 
```js
// example.js( Example component to get ref attribute )

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import react from 'react'
import refDecoratorComponent from 'ref-decorator-component'

class Example extends React.Component{
  //here is your code
  test(){
    return 'test'
  }
  render(){
  }
}

export refDecoratorComponent([injectIntl, connect(
  state=>state.exampleState
  )], ExampleComponent)


// app.js
import react from 'react'
import Example from 'example'

export class App extends React.Component {

  // use ref of the example component by _getRef function
  test(){
    this.exampleInstance._getRef().test() // return test
  }

  render(){
    <Example ref={ (instance)=>(this.exampleInstance=instance)}>
  }
}
```