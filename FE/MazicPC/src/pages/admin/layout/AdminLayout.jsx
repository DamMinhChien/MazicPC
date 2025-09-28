import { useState, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import SubmitContext from "@utils/SubmitContext";
import DataTable from "../components/DataTable";
import MyOffcanvas from "../components/MyOffcanvas";
import ButtonIcon from "@components/ButtonIcon";
import ConfirmModal from "@components/ConfirmModal";
import SearchBar from "../components/SearchBar";

const AdminLayout = ({ data, fields, schema, onSubmit }) => {
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");

  // form state
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // confirm delete state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // lấy title, handleDel, handleDelMany từ context
  const { title, handleDel, handleDelMany } = useContext(SubmitContext);

  // mở form thêm
  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  // mở form sửa
  const handleEdit = (row) => {
    setEditData(row);
    setShowForm(true);
  };

  // mở confirm xoá
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // xác nhận xoá
  const confirmDelete = () => {
    if (deleteId) {
      handleDel(deleteId);
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleSearch = (q) => setGlobalFilter(q);

  return (
    <>
      {/* header */}
      <Container
        fluid
        className="d-flex justify-content-between align-items-center px-4 py-2 bg-dark"
      >
        <div className="d-flex gap-3 align-items-center">
          <h5 className="text-white mb-0">{`Quản lý ${title}`}</h5>
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
          {/* Xoá nhiều */}
          <ButtonIcon
            bg="danger"
            icon={<FaTrashAlt />}
            label="Xóa"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xoá các mục đã chọn?")) {
                handleDelMany();
              }
            }}
          />
          {/* Thêm mới */}
          <ButtonIcon
            bg="success"
            icon={<FaPlus />}
            onClick={handleAdd}
            label="Thêm mới"
          />
        </div>
      </Container>

      {/* table */}
      <DataTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete} // xoá 1 bản ghi
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

      {/* confirm modal */}
      <ConfirmModal
        message={`Bạn có chắc chắn muốn xóa ${title} này không?`}
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminLayout;
