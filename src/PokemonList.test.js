import { render, screen, fireEvent } from '@testing-library/react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

test('Triggering search', () => {
  render(<PokemonList />);
  const searchInput = screen.queryByPlaceholderText('Search...')
  
  fireEvent.change(searchInput, { target: { value: 'test' } })
  expect(searchInput).toBeInTheDocument();
  expect(searchInput.value).toBe('test');

});



test('Pagination', () => {
    const handlePagination = jest.fn();
    
    render(<Pagination
    length={20}
    pokemonsPerPage={10}
    currentPage={1}
    handlePagination={handlePagination}
    />)

    fireEvent.click(screen.getByText('1'));
    expect(handlePagination).toHaveBeenCalledTimes(1);
})