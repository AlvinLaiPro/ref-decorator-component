import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount } from 'enzyme'
import { injectIntl } from 'react-intl'
import refDecoratorComponent, {
  refComponentHoc
} from '../src/refDecoratorComponent'
import { mountWithIntl } from '../helpers/intl-enzyme-test-helper.js'

chai.use(chaiEnzyme())

describe('without refDecoratorComponent', () => {
  
  it('can get instance of Child component by refComponentHoc', () => {
    const createChild = () => {
      class Child extends React.Component {
        childMethod() {
          return 'child'
        }
        render() {
          return (
            <div id={this.props.id}>
              {this.props.message}
            </div>
          )
        }
      }
      return Child
    }
    const Wrapper = refComponentHoc(createChild())
    const originComponent = mount(<Wrapper id="test" message="hello" />)
    expect(originComponent.find('#test')).to.be.present()
    expect(originComponent.instance()['Child'].childMethod()).to.equal('child')
  })
  it('can not get instance of Child component decorated by injectIntl', () => {
    const createChild = () => {
      class Child extends React.Component {
        childMethod() {
          return 'child'
        }
        render() {
          return (
            <div id={this.props.id}>
              {this.props.message}
            </div>
          )
        }
      }
      return Child
    }
    const Child = refComponentHoc(createChild())
    const Wrapper = injectIntl(Child)
    const originComponent = mountWithIntl(<Wrapper id="test" message="hello" />)
    expect(originComponent.find('#test')).to.be.present()
    expect(originComponent.instance()['Child']).to.equal(undefined)
  })
})

describe('refDecoratorComponent', () => {
  it('allow us to get instance of Child component decorated by injectIntl', () => {
    const createChild = () => {
      class Child extends React.Component {
        childMethod() {
          return 'child'
        }
        render() {
          return (
            <div id={this.props.id}>
              {this.props.message}
            </div>
          )
        }
      }
      return Child
    }
    const Child = createChild()
    const Wrapper = refDecoratorComponent([injectIntl], Child)
    const refComponent = mountWithIntl(<Wrapper id="test" message="hello" />)
    expect(refComponent.find('#test')).to.be.present()
    expect(refComponent.instance()._getRef().childMethod()).to.equal('child')
  })
})
