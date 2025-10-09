import { useState, useRef, useEffect } from "react";
import { FormControl, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ROUTERS from "../../../utils/router";

const SearchHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSearch = () => {
    if (!showSearch) {
      // Nếu input đang ẩn, bật lên
      setShowSearch(true);
      return;
    }

    const trimmed = query.trim();
    if (trimmed) {
      navigate(`${ROUTERS.USER.PRODUCTS}?search=${encodeURIComponent(trimmed)}`);
    } else {
      // Nếu query rỗng thì thu nhỏ ô tìm kiếm
      setShowSearch(false);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowSearch(false);
      setQuery("");
    }
  };

  const handleBlur = (e) => {
    const related = e.relatedTarget;
    if (
      related &&
      (related.classList.contains("clear-btn") ||
        related.classList.contains("search-btn"))
    ) {
      return;
    }
    setShowSearch(false);
    setQuery("");
  };

  return (
    <div className="d-flex align-items-center position-relative">
      {/* InputGroup, ẩn hiện bằng class */}
      <InputGroup
        className={`me-2 flex-grow-1 align-items-center overflow-hidden transition-search ${
          showSearch ? "open" : ""
        }`}
      >
        <FormControl
          ref={inputRef}
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoComplete="off"
          aria-label="Tìm kiếm sản phẩm"
          className="rounded-start-0"
        />
        {query && (
          <Button
            variant="outline-secondary"
            onClick={handleClear}
            className="clear-btn rounded-end-0 border-end-0 px-2"
            tabIndex={0}
            aria-label="Xóa tìm kiếm"
          >
            <FaTimes />
          </Button>
        )}
      </InputGroup>

      {/* Nút icon search bên phải input */}
      <Button
        variant="link"
        onClick={handleSearch}
        aria-label="Tìm kiếm"
        className={`p-1 text-dark search-btn ${
          showSearch ? "text-primary" : ""
        }`}
        style={{ zIndex: 11 }}
      >
        <FaSearch size={20} />
      </Button>

      <style jsx>{`
        .transition-search {
          max-width: 0;
          opacity: 0;
          pointer-events: none;
          transition: max-width 0.4s ease, opacity 0.4s ease;
        }
        .transition-search.open {
          max-width: 400px;
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 575.98px) {
          .transition-search.open {
            max-width: 180px;
          }
        }
        @media (max-width: 399.98px) {
          .transition-search.open {
            max-width: 140px;
          }
        }
        .clear-btn,
        .search-btn {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SearchHeader;
