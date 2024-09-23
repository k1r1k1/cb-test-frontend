import renderer from 'react-test-renderer';
import React from 'react'

import SearchInput from './index';

jest.mock('./styles.scss');

const renderTree = tree => renderer.create(tree);
describe('<SearchInput>', () => {
  it('should render component', () => {
    expect(renderTree(<SearchInput 
    />).toJSON()).toMatchSnapshot();
  });
  
});