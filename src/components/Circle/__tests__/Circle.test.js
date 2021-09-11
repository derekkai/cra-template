import React from 'react'
import renderer from 'react-test-renderer'
import MockAppWrapper from 'components/MockAppWrapper/MockAppWrapper'
import ReactDOM from 'react-dom'
import Circle from '../Circle'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MockAppWrapper>
      <Circle percent={0} />
    </MockAppWrapper>,
    div,
  )
})

it('render correctly', () => {
  const wrapper = renderer
    .create(
      <MockAppWrapper>
        <Circle percent={49} />
      </MockAppWrapper>,
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})
