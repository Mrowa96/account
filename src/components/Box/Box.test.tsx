import React from 'react';
import { render } from '@testing-library/react';
import Box from '.';

describe('[Component] Box', () => {
  it('should render box with title and content', () => {
    const { getByTestId, getByRole } = render(<Box title='Box title'>Example text</Box>);

    expect(getByRole('article')).toBeInTheDocument();
    expect(getByRole('heading')).toHaveTextContent('Box title');
    expect(getByTestId('content')).toHaveTextContent('Example text');
  });

  it('should have ability to set additional content class', () => {
    const { getByTestId } = render(
      <Box title='Box title' contentClassName='additional-class'>
        Example text
      </Box>,
    );

    expect(getByTestId('content')).toHaveClass('additional-class');
  });
});
