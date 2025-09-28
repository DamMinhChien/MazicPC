import React, { memo, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import ButtonIcon from "../../../components/ButtonIcon";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import DataTable from "../components/DataTable";
import MyOffcanvas from "../components/MyOffcanvas";

const AdminLayout = ({ title, data, fields, schema }) => {
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  // state cho form
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // mở form thêm
  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
    console.log("editData", editData);
  };

  // mở form sửa
  const handleEdit = (row) => {
    setEditData(row);
    setShowForm(true);
  };
  // xóa
  const handleDelete = (row) => console.log("Delete", row);
  const handleSearch = (q) => setGlobalFilter(q);

  return (
    <>
      {/* header */}
      <Container
        fluid
        className="d-flex justify-content-between align-items-center px-4 py-2 bg-dark"
      >
        <div className="d-flex gap-3 align-items-center">
          <h5 style={{ whiteSpace: "nowrap" }} className="text-white mb-0">{`Quản lý ${title}`}</h5>
          <Form.Select
            className="bg-info text-light"
            size="sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5 / trang</option>
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
          </Form.Select>
        </div>
        
        <SearchBar onSearch={handleSearch} />
        <div className="d-flex gap-2">
          <ButtonIcon bg="danger" icon={<FaTrashAlt />} label="Xóa" />
          <ButtonIcon bg="success" icon={<FaPlus />} onClick={handleAdd} label="Thêm mới" />
        </div>
      </Container>

      {/* table */}
      <DataTable
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={pageSize}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />

      {/* form offcanvas */}
      <MyOffcanvas
        show={showForm}
        onHide={() => setShowForm(false)}
        title={title}
        schema={schema}
        defaultValues={editData || {}}
        fields={fields}
        onSubmit={(formData) => {
          onSubmit(formData, editData);
          setShowForm(false);
        }}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
};

export default AdminLayout;
