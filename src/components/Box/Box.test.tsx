import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from '.';

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

describe('[Component] Box', () => {
  let component;

  beforeEach(() => {
    setItemSpy.mockReset();
    getItemSpy.mockReset();
    component = (
      <Box title='Example title' uniqueName='example-box'>
        Content text
      </Box>
    );
  });

  it('should render box with title, toggle button and content', () => {
    const { getByTestId, getByRole, getByLabelText, getByText } = render(component);

    expect(getByTestId('box')).toBeInTheDocument();
    expect(getByRole('heading')).toHaveTextContent('Example title');
    expect(getByLabelText('Shrink')).toBeInTheDocument();
    expect(getByText('Content text')).toBeInTheDocument();
  });

  it('should be in expanded mode by default', () => {
    const { getByText, queryByLabelText } = render(component);

    expect(getByText('Content text')).toBeInTheDocument();
    expect(queryByLabelText('Expand')).not.toBeInTheDocument();
  });

  it('should shrink box after first click on toggle button', () => {
    const { queryByText, getByLabelText, queryByLabelText } = render(component);

    fireEvent.click(getByLabelText('Shrink'));

    expect(queryByLabelText('Shrink')).not.toBeInTheDocument();
    expect(getByLabelText('Expand')).toBeInTheDocument();
    expect(queryByText('Content text')).not.toBeInTheDocument();
  });

  it('should be able to run in shrink mode by default', () => {
    const { queryByText, getByLabelText, queryByLabelText } = render(
      <Box title='Example title' uniqueName='example-box' isExpandedByDefault={false}>
        Content text
      </Box>,
    );

    expect(queryByText('Content text')).not.toBeInTheDocument();
    expect(queryByLabelText('Shrink')).not.toBeInTheDocument();
    expect(getByLabelText('Expand')).toBeInTheDocument();
  });

  it('should save state in storage after toggle button click', () => {
    const { getByRole } = render(component);

    fireEvent.click(getByRole('button'));

    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should restore state from storage if exists', () => {
    getItemSpy.mockReturnValue('1');

    const { queryByLabelText, getByText } = render(
      <Box title='Example title' uniqueName='example-box' isExpandedByDefault={false}>
        Content text
      </Box>,
    );

    expect(queryByLabelText('Shrink')).toBeInTheDocument();
    expect(getByText('Content text')).toBeInTheDocument();
  });

  it('should allow to set custom class', () => {
    const { getByTestId } = render(
      <Box title='Example title' uniqueName='example-box' className='custom-class'>
        Content text
      </Box>,
    );

    expect(getByTestId('box')).toHaveClass('custom-class');
  });
});
