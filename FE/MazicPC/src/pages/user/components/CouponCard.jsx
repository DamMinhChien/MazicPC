import { motion } from "framer-motion";
import { FaCalendar, FaCopy } from "react-icons/fa";

export default function CouponCard({ coupon }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
  };

  const remain = coupon.quantity - coupon.usedCount;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="voucher-card"
      >
        {/* Header */}
        <div className="voucher-header">
          <div className="voucher-value">
            {coupon.isPercent
              ? `${coupon.discount}%`
              : `${coupon.discount.toLocaleString()}đ`}
          </div>

          <div className="voucher-remaining">
            Còn lại: <strong>{remain}</strong>
          </div>
        </div>

        {/* Date range */}
        <div className="voucher-conditions d-flex justify-content-center align-items-center">
            <FaCalendar style={{ marginRight: "8px" }} />
          {new Date(coupon.startDate).toLocaleDateString()} –{" "}
          {new Date(coupon.endDate).toLocaleDateString()}
        </div>

        {/* Body */}
        <div className="voucher-body">
          <div className="voucher-code" onClick={handleCopy}>
            {coupon.code}
          </div>

          <button className="voucher-btn copy-btn" onClick={handleCopy}>
            <FaCopy style={{ marginRight: "8px" }} />
            Copy mã
          </button>
        </div>
      </motion.div>
      <style jsx>{`
        .voucher-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: 0.25s;
          padding-bottom: 1.5rem;
        }

        /* Header */
        .voucher-header {
          padding: 1.6rem;
          text-align: center;
          background: #f9f9f9;
          border-bottom: 1px dashed #ddd;
        }

        .voucher-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ff6b00;
        }

        .voucher-remaining {
          margin-top: 6px;
          font-size: 1rem;
          color: #666;
        }

        .voucher-conditions {
          padding: 1rem;
          text-align: center;
          background: #fafafa;
          font-size: 1rem;
          border-bottom: 1px dashed #e5e5e5;
        }

        .voucher-body {
          padding: 1.5rem;
        }

        .voucher-code {
          background: #f8f9fa;
          padding: 1.2rem;
          border-radius: 12px;
          text-align: center;
          font-size: 1.4rem;
          font-weight: 700;
          border: 2px dashed #ff6b00;
          color: #ff6b00;
          cursor: pointer;
          letter-spacing: 2px;
          transition: 0.2s;
        }

        .voucher-code:hover {
          transform: scale(1.03);
        }

        .copy-btn {
          width: 100%;
          margin-top: 1rem;
          background: #ff6b00;
          color: white;
          padding: 0.9rem;
          border-radius: 10px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }

        .copy-btn:hover {
          opacity: 0.85;
        }
      `}</style>
    </>
  );
}
