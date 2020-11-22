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

  it('should have ability to disable padding for content', () => {
    const { getByTestId } = render(
      <Box title='Box title' disablePadding>
        Example text
      </Box>,
    );

    expect(getByTestId('content')).toHaveClass('WithoutPadding');
  });
});
