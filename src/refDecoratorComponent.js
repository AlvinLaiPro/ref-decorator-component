import React from 'react'

/**
 * 通过react高阶组件取到子组件的引用
 * @param {React Component} ChildComponent
 * @param {object} refer
 */
export function refComponentHoc(ChildComponent, refer) {
  return class RefComponent extends React.Component {
    constructor(props) {
      super(props)
      this._setRef = this.setRef.bind(this)
    }
    setRef(childComponentInstance) {
      if (refer) {
        refer['ref'] = childComponentInstance
      }
      this[ChildComponent.name] = childComponentInstance
    }
    render() {
      const props = { ...this.props, ref: this._setRef }
      return <ChildComponent {...props} />
    }
  }
}

function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  var stamp = (+new Date() + '').slice(-5)
  for (var i = 0; i < 10; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1) + stamp
  }
  return s.join('')
}

/**
 * 通过getRef方法取到wrappedComponent的实例
 * @param {array} decorators
 * @param {React Component} wrappedComponent
 */
export default function refDecoratorComponent(decorators, wrappedComponent) {
  let refer = new Proxy(
    { id: '' },
    {
      get: function (target, key, receiver) {
        if (key === 'id') {
          let value = target['id']
          target['id'] = ''
          return value
        }
        return target[key]
      },
      set: function (target, key, value, receiver) {
        key = uuid()
        target['id'] = key
        target[key] = value
        return true
      }
    }
  )
  const refComponent = refComponentHoc(wrappedComponent, refer)
  const ResultComponent = decorators.reduce((prev, next) => {
    return next(prev)
  }, refComponent)

  return class RefComponentWrapper extends React.Component {
    constructor(props) {
      super(props)
      this._getRef = this.getRef.bind(this)
    }

    componentDidMount() {
      !this._refId && (this._refId = refer['id'])
    }

    getRef() {
      return refer[this._refId]
    }

    render() {
      const props = { ...this.props }
      return <ResultComponent {...props} />
    }

    componentWillUnmount() {
      refer[this._refId] = null
      this._refId = null
    }
  }
}
