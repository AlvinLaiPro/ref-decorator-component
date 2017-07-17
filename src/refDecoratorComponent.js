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
      if(refer){
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

/**
 * 通过getRef方法取到wrappedComponent的实例
 * @param {array} decorators 
 * @param {React Component} wrappedComponent 
 */
export function refDecoratorComponent(decorators, wrappedComponent) {

  let refer = {}
  const refComponent = refComponentHoc(wrappedComponent, refer)
  const ResultComponent = decorators.reduce((prev, next) => {
    return next(prev)
  }, refComponent)

  return class RefComponentWrapper extends React.Component {

    constructor(props) {
      super(props)
      this._getRef = this.getRef.bind(this)
    }

    getRef() {
      return refer['ref']
    }
    
    render() {
      const props = { ...this.props }
      return <ResultComponent {...props} />
    }

    componentWillUnmount() {
      refer['ref'] = null
      refer = null
    }
  }
}
