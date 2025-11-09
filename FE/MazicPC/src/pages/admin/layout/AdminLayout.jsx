import { useState, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import SubmitContext from "@utils/SubmitContext";
import DataTable from "../components/DataTable";
import MyOffcanvas from "../components/MyOffcanvas";
import ButtonIcon from "@components/ButtonIcon";
import ConfirmModal from "@components/ConfirmModal";
import SearchBar from "../components/SearchBar";
import MyToast from "../../../components/MyToast";

const AdminLayout = ({
  data,
  fields,
  postSchema,
  putSchema,
  onSubmit,
  addButtonShow,
  permissions = {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canDeleteMany: true,
  }, // mặc định tất cả true
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState("");

  // form state delete multiple
  const [showConfirmBulk, setShowConfirmBulk] = useState(false);
  const confirmDeleteBulk = () => {
    if (selectedIds.length > 0) {
      handleDelMany(selectedIds);
      setSelectedIds([]);
    }
    setShowConfirmBulk(false);
    setError("");
  };

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
          <h5 className="text-white text-nowrap mb-0">{`Quản lý ${title}`}</h5>
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
          {permissions.canDeleteMany && (
            <ButtonIcon
              bg="danger"
              icon={<FaTrashAlt />}
              label="Xóa"
              onClick={() => {
                if (selectedIds.length === 0) {
                  setError("Vui lòng chọn ít nhất 1 mục để xóa");
                  return;
                }
                setShowConfirmBulk(true);
              }}
            />
          )}

          {/* Thêm mới */}
          {permissions.canAdd && !addButtonShow && (
            <ButtonIcon
              bg="success"
              icon={<FaPlus />}
              onClick={handleAdd}
              label="Thêm mới"
            />
          )}
        </div>
      </Container>

      {/* table */}
      <DataTable
        data={data}
        onEdit={permissions.canEdit ? handleEdit : null}
        onDelete={permissions.canDelete ? handleDelete : null}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        pageSize={pageSize}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        canDelete={permissions.canDelete}
        canEdit={permissions.canEdit}
      />

      {/* form offcanvas */}
      <MyOffcanvas
        show={showForm}
        onHide={() => setShowForm(false)}
        title={title}
        postSchema={postSchema}
        putSchema={putSchema}
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

      {/* confirm modal xoá nhiều */}
      <ConfirmModal
        message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} ${title} này không?`}
        show={showConfirmBulk}
        onClose={() => setShowConfirmBulk(false)}
        onConfirm={confirmDeleteBulk}
      />

      <MyToast
        title="Lỗi"
        bg="danger"
        show={!!error}
        message={error}
        onClose={() => setError("")}
      />
    </>
  );
};

export default AdminLayout;
