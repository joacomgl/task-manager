import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tasks from '../src/pages/Tasks';

describe('Tasks page', () => {
  it('renders the heading', () => {
    render(<Tasks />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });
});
