
const Pagination = ({ pokemonsPerPage, length, currentPage, handlePagination }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / pokemonsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className='pagination'>
      {paginationNumbers.map((pageNumber) => (
        <button
            key={pageNumber}
            className={currentPage === pageNumber ? 'active' : ''}
            onClick={()=> handlePagination(pageNumber)}
        >
        {pageNumber}
      </button>
      ))}
    </div>
  );
};

export default Pagination;