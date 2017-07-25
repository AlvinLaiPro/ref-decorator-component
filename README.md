# ref-decorator-component
to solve React component reference lost in decorator mode
解决react component被装饰器装饰时ref属性丢失
## Usage

First, install the package using npm:
```shell
    npm install ref-decorator-component --save
```

Then, require the package and use it like so:
 
```js
// yourComponent.js( YourComponent to be refered )

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'
import react from 'react'
import refDecoratorComponent from 'ref-decorator-component'

class YourComponent extends React.Component{
  //here is your code
  test(){
    return 'test'
  }
  render(){
  }
}

export default refDecoratorComponent([injectIntl, connect(
  state=>state.YourComponentState
  )], YourComponent)


// app.js
import react from 'react'
import YourComponent from 'yourComponent'

export class App extends React.Component {

  // Use the _getRef method to get the instance of decorated class(YourComponent)
  // 通过 _getRef 方法取到被层层装饰的YourComponent类实例
  test(){
    this.yourComponentInstance._getRef().test() // return test
  }

  render(){
    <YourComponent ref={ (instance)=>(this.yourComponentInstance=instance)}>
  }
}
```