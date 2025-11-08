import React, { useState } from "react";
import {
  Card,
  Button,
  ListGroup,
  Badge,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import reviewService from "../../../apis/reviewService";
import reviewSchema from "../../../schemas/user/reviewSchema";
import { useSelector } from "react-redux";
import MyToast from "../../../components/MyToast";
import { FaStar } from "react-icons/fa";

// Component hiển thị + thêm/sửa/xóa review cho productId
const ProductReviews = ({ productId }) => {
  const queryClient = useQueryClient();
  const authUser = useSelector((s) => s.auth.user);
  const myName = authUser?.user?.fullName || authUser?.username || null;
  const isAdmin = authUser?.role === "Admin";

  const [toast, setToast] = useState({ show: false, msg: "", bg: "success" });
  const [editing, setEditing] = useState(null); // review object đang edit
  const [showEditModal, setShowEditModal] = useState(false);

  // helper lấy message từ error trả về (string | object | axios error)
  const getErrorMessage = (err) => {
    if (!err) return "Có lỗi xảy ra";
    if (typeof err === "string") return err;
    // axios style
    if (err.response && err.response.data) {
      const d = err.response.data;
      if (typeof d === "string") return d;
      if (d.message) return d.message;
      try {
        return JSON.stringify(d);
      } catch {
        return String(d);
      }
    }
    if (err.message) return err.message;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  };

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewService.getReviewsByProduct(productId),
    onError: (err) =>
      setToast({ show: true, msg: getErrorMessage(err), bg: "danger" }),
    enabled: !!productId,
  });

  const createMutation = useMutation({
    mutationFn: (payload) => reviewService.createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setToast({ show: true, msg: "Đã gửi đánh giá", bg: "success" });
    },
    onError: (err) =>
      setToast({ show: true, msg: getErrorMessage(err), bg: "danger" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => reviewService.updateReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setToast({
        show: true,
        msg: "Cập nhật đánh giá thành công",
        bg: "success",
      });
      setShowEditModal(false);
      setEditing(null);
    },
    onError: (err) =>
      setToast({ show: true, msg: getErrorMessage(err), bg: "danger" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => reviewService.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setToast({ show: true, msg: "Xóa đánh giá thành công", bg: "success" });
    },
    onError: (err) =>
      setToast({ show: true, msg: getErrorMessage(err), bg: "danger" }),
  });

  // Form tạo review
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema.post),
    defaultValues: { productId, rating: 5, comment: "" },
  });

  // Form sửa review
  const {
    register: regEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    setValue: setValueEdit,
    watch: watchEdit,
    formState: { errors: editErrors, isSubmitting: isEditingSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema.put),
    defaultValues: { rating: 5, comment: "" },
  });

  // Interactive star handlers for create form
  const currentRating = Number(watch("rating") || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const renderInteractiveStars = (valueGetter, onSet) =>
    [1, 2, 3, 4, 5].map((i) => {
      const active = i <= (hoverRating || valueGetter());
      return (
        <FaStar
          key={i}
          size={20}
          className={active ? "text-warning" : "text-muted"}
          style={{ cursor: "pointer", marginRight: 6 }}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => {
            onSet(i);
          }}
          role="button"
          title={`${i} sao`}
        />
      );
    });

  const onSubmit = async (data) => {
    console.log("onSubmit chạy", data);
    const payload = {
      productId: Number(productId),
      rating: Number(data.rating),
      comment: data.comment ?? "",
    };
    await createMutation.mutateAsync(payload);
    reset({ productId, rating: 5, comment: "" });
  };

  const onEdit = (review) => {
    setEditing(review);
    resetEdit({ rating: review.rating, comment: review.comment || "" });
    setShowEditModal(true);
  };

  const onSubmitEdit = async (formData) => {
    if (!editing) return;
    const payload = {
      rating: Number(formData.rating),
      comment: formData.comment ?? "",
    };
    await updateMutation.mutateAsync({ id: editing.id, payload });
  };

  const canModify = (review) => {
    if (!authUser) return false;
    if (isAdmin) return true;
    if (!review.fullName) return false;
    return review.fullName === myName;
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const renderStarsText = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Đánh giá ({reviews.length})</h5>
      </Card.Header>

      <Card.Body>
        {/* Form thêm review */}
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <Row className="align-items-center">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Đánh giá</Form.Label>
                <div>
                  {renderInteractiveStars(
                    () => Number(watch("rating") || 0),
                    (v) => setValue("rating", v, { shouldValidate: true })
                  )}
                </div>
              </Form.Group>
            </Col>

            <Col md={9}>
              <Form.Group>
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register("comment")}
                  placeholder="Chia sẻ cảm nhận của bạn..."
                />
                {errors.comment && (
                  <div className="text-danger small mt-1">
                    {errors.comment.message}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={1} className="text-end">
              <Button
                type="submit"
                disabled={isSubmitting || createMutation.isLoading}
              >
                Gửi
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Danh sách reviews */}
        <ListGroup variant="flush">
          {isLoading ? (
            <ListGroup.Item>Đang tải...</ListGroup.Item>
          ) : reviews.length === 0 ? (
            <ListGroup.Item>Chưa có đánh giá nào.</ListGroup.Item>
          ) : (
            reviews.map((r) => (
              <ListGroup.Item key={r.id} className="d-flex align-items-start">
                <div className="me-3" style={{ minWidth: 110 }}>
                  <div className="fw-semibold">{r.fullName}</div>
                  <div>
                    <Badge bg="warning" text="dark">
                      {renderStarsText(r.rating)}
                    </Badge>
                  </div>
                  <div className="text-muted small mt-1">
                    {formatDate(r.createdAt)}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <div className="mb-2">{r.comment}</div>
                  <div className="d-flex gap-2">
                    {canModify(r) && (
                      <>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => onEdit(r)}
                        >
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteMutation.mutate(r.id)}
                        >
                          Xóa
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>

      {/* Modal sửa */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit(onSubmitEdit)}>
            <Form.Group className="mb-3">
              <Form.Label>Đánh giá</Form.Label>
              <div>
                {renderInteractiveStars(
                  () => Number(watchEdit("rating") || 0),
                  (v) => setValueEdit("rating", v, { shouldValidate: true })
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control as="textarea" rows={3} {...regEdit("comment")} />
              {editErrors.comment && (
                <div className="text-danger small mt-1">
                  {editErrors.comment.message}
                </div>
              )}
            </Form.Group>

            <div className="text-end">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
                className="me-2"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isEditingSubmitting || updateMutation.isLoading}
              >
                Lưu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <MyToast
        show={!!toast.show}
        message={toast.msg}
        bg={toast.bg}
        onClose={() => setToast({ show: false, msg: "", bg: "success" })}
      />
    </Card>
  );
};

export default ProductReviews;
