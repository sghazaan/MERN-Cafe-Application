import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from "react-router-dom";
import Create from '../src/components/create.js';
import Navbar from '../src/components/navbar.js';

test('Create test', () => {
  render(<Create />);
  const linkElement = screen.getByTestId("mainDiv");
  expect(linkElement).toBeInTheDocument();
});


test('renders the landing page', () => {
  render(<Create />);
});

test('Testing Add deal button', () => {
  render(<Create />);
  expect(screen.getByRole("button", { name: "Create person" })).toBeEnabled();
});

test('Testing Add deal button', () => {
  render(<Create />);
  expect(screen.getByRole("radio", { name: "Student" })).toBeEnabled();
});

test('Testing Add deal button', () => {
  render(<Create />);
  expect(screen.getByRole("radio", { name: "Faculty" })).toBeEnabled();
});



test("Navbar test", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const linkElement = screen.getByTestId("nav");
  expect(linkElement).toHaveTextContent("Create New Customer Record");
});

test("Navbar photo test", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const linkElement = screen.getByTestId("nav");
  expect(screen.getByRole("img")).toBeInTheDocument();
});