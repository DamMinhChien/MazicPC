import { useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Badge,
} from "react-bootstrap";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

import MyFullSpinner from "../../components/MyFullSpinner";
import shippingAddressService from "../../apis/shippingAddressService";
import AddressForm from "./components/AddressForm";

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["Address"],
    queryFn: () => shippingAddressService.getShippingAddresses(),
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id) => shippingAddressService.deleteShippingAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries("Address");
      setShowConfirm(false);
    },
  });

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditData(address);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  return (
    <>
      <Card className="text-center my-4 shadow-sm p-4 bg-light border-0 container">
        <h2 className="fw-bold">Địa chỉ nhận hàng</h2>
        <p className="text-muted">Linh hoạt địa chỉ khi thanh toán</p>
      </Card>
      <Container>
        <Row className="g-3">
          {data?.length > 0
            ? data.map((addr) => (
                <Col md={6} lg={4} key={addr.id}>
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <Card.Title className="mb-2">
                          {addr.fullName}
                        </Card.Title>
                        <div>
                          <Button
                            variant="link"
                            className="p-0 me-2"
                            onClick={() => handleEdit(addr)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="link"
                            className="p-0 text-danger"
                            onClick={() => handleDelete(addr.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                      <Card.Subtitle className="text-muted mb-2">
                        {addr.phone}
                      </Card.Subtitle>
                      <Card.Text>
                        <div>{addr.detailAddress}</div>
                        <div>
                          {addr.ward}, {addr.district}, {addr.province}
                        </div>
                        {addr.note && (
                          <div className="mt-2 text-secondary">
                            <small>Ghi chú: {addr.note}</small>
                          </div>
                        )}
                        {addr.isDefault && (
                          <Badge bg="primary" className="mt-2">
                            Mặc định
                          </Badge>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : !isLoading && (
                <Col xs={12}>
                  <p className="text-center text-muted">Chưa có địa chỉ nào.</p>
                </Col>
              )}
        </Row>

        <div className="text-center my-4">
          <Button variant="outline-primary" onClick={handleAdd}>
            <IoAddCircleOutline className="me-2" />
            Thêm địa chỉ mới
          </Button>
        </div>
      </Container>

      {/* Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editData ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm
            data={editData}
            onSuccess={() => {
              setShowForm(false);
              queryClient.invalidateQueries("Address");
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa địa chỉ này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteMutation.mutate(deleteId)}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Đang xóa..." : "Xóa"}
          </Button>
        </Modal.Footer>
      </Modal>

      <MyFullSpinner show={isLoading} />
    </>
  );
};

export default Address;
