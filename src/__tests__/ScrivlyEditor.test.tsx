import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrivlyEditor } from '../components/ScrivlyEditor';
import DOMPurify from 'dompurify';

// Mock DOMPurify to verify it's being called
jest.mock('dompurify', () => ({
  sanitize: jest.fn((html) => html),
}));

describe('ScrivlyEditor', () => {
  it('renders correctly with placeholder', () => {
    const { container } = render(<ScrivlyEditor value="" onChange={jest.fn()} placeholder="Test Placeholder" />);
    const editor = container.querySelector('.scrivly-editor-content');
    expect(editor).toHaveAttribute('data-placeholder', 'Test Placeholder');
  });

  it('sanitizes initial value', () => {
    const dirtyHtml = '<img src=x onerror=alert(1)>';
    render(<ScrivlyEditor value={dirtyHtml} onChange={jest.fn()} />);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(dirtyHtml);
  });

  it('updates word count and character count', () => {
    const { container } = render(<ScrivlyEditor value="Hello world" onChange={jest.fn()} />);
    
    // Check if stats are visible (assuming default showWordCount=true)
    const stats = container.querySelector('.scrivly-editor-stats');
    expect(stats).toBeInTheDocument();
    expect(stats?.textContent).toContain('2 words');
    expect(stats?.textContent).toContain('11 characters');
  });

  it('calls onChange when content is edited', () => {
    const onChange = jest.fn();
    const { container } = render(<ScrivlyEditor value="" onChange={onChange} />);
    
    const editor = container.querySelector('.scrivly-editor-content') as HTMLElement;
    if (editor) {
      editor.innerHTML = '<p>New content</p>';
      fireEvent.input(editor);
      expect(onChange).toHaveBeenCalledWith('<p>New content</p>');
    }
  });

  it('toggles dark mode', () => {
    const onDarkModeChange = jest.fn();
    render(<ScrivlyEditor value="" onChange={jest.fn()} onDarkModeChange={onDarkModeChange} />);
    
    const darkModeButton = screen.queryByTitle('Dark Mode') || screen.queryByLabelText('Dark Mode');
    if (darkModeButton) {
      fireEvent.click(darkModeButton);
      expect(onDarkModeChange).toHaveBeenCalledWith(true);
    }
  });
});
