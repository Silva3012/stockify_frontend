import { render, screen } from '@testing-library/react';
import Home from './index';
import "@testing-library/jest-dom";

test('renders Home component correctly', () => {
  // Render the Home component and capture the rendered output
  const { container } = render(<Home />);
  
  // Compare the rendered output with the stored snapshot
  expect(container.firstChild).toMatchSnapshot();
});


// Unit test
describe("Home", () => {
  it('renders home page', () => {
    render(<Home />);
  })
})