import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>

        <Form.Control
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <Button variant="outline-secondary" className="text-white" onClick={handleClear}>
            <FaTimes />
          </Button>
        )}

        <Button type="submit" variant="primary">
          Tìm
        </Button>
      </InputGroup>
    </Form>
  );
}
