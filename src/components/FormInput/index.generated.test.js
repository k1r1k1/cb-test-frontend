import renderer from 'react-test-renderer';
import React from 'react'
import FormInput from './index';

const renderTree = tree => renderer.create(tree);
describe('<FormInput>', () => {
  it('should render component', () => {
    expect(renderTree(<FormInput 
    />).toJSON()).toMatchSnapshot();
  });
  
});