# ref-decorator-component
to solve React component reference lost in decorator mode
## Usage

First, install the package using npm:

    npm install ref-decorator-component --save

Then, require the package and use it like so:

import {injectIntl} from 'react-intl'
import {connect} from 'react-redux'

var refDecoratorComponent = require('ref-decorator-component');
var ExampleComponent = require('example')

var refExampleComponent = refDecoratorComponent([injectIntl, connect(
  state=>state.exampleState
  )], ExampleComponent)

refExampleComponent._getRef() // get the instance of example component