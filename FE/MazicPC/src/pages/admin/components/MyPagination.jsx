import ReactPaginate from "react-paginate";

const MyPagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <div className="my-4">
      <ReactPaginate
        previousLabel={"Trang trước"}
        nextLabel={"Trang sau"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => {
          onPageChange(e.selected + 1);
        }}
        forcePage={currentPage - 1}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          padding: 0.5rem 0;
          list-style: none;
        }

        .page-item {
          margin: 0 3px;
        }

        .page-link {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: 0.25rem;
          border: 1px solid --bs-secondary;
          color: --bs-primary;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s, color 0.2s;
        }

        .page-link:hover {
          background-color: --bs-primary;
          color: white;
        }

        .page-item.active .page-link {
          background-color: --bs-primary;
          color: white;
          border-color: --bs-primary;
        }

        .page-link:focus {
          outline: none;
          box-shadow: 0 0 0 0.5rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </div>
  );
};

export default MyPagination;
