import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import DashboardWidget from "../components/DashboardWidget";
import { useQuery } from "@tanstack/react-query";
import statsService from "../../../apis/statsService";
import MyFullSpinner from "@components/MyFullSpinner";
import { motion } from "framer-motion";
import TextHeader from "../../user/components/TextHeader";
import MyBarChart from "../components/MyBarChart";
import { CChartLine, CChartPie } from "@coreui/react-chartjs";
import chroma from "chroma-js";

const MotionCol = motion(CCol);

const Dashboard = () => {
  // Load API

  const { data: totals = {}, isLoading: loadingTotals } = useQuery({
    queryKey: ["stats_totals"],
    queryFn: statsService.getTotalsAdmin,
  });

  const { data: revenueData = {}, isLoading: loadingRevenue } = useQuery({
    queryKey: ["stats_revenue"],
    queryFn: statsService.getRevenue,
  });

    const { data: revenueByCategoryData = {}, isLoading: loadingRevenueByCategoryData } = useQuery({
    queryKey: ["stats_revenueByCategoryData"],
    queryFn: statsService.getRevenueByCategoryData,
  });

  const { data: categoryData = {}, isLoading: loadingCategory } = useQuery({
    queryKey: ["stats_category"],
    queryFn: statsService.getStatisticByCategory,
  });

  const { data: manufacturerData = {}, isLoading: loadingManu } = useQuery({
    queryKey: ["stats_manufacturer"],
    queryFn: statsService.getStatisticByManufacturer,
  });

  const labels = revenueData.labels || [];
  const revenue = revenueData.data || [];

  const labelsByCategory = revenueByCategoryData.labels || [];
  const revenueByCategory = revenueByCategoryData.data|| [];

  const colors = chroma
  .scale(["#4e79a7", "#f28e2b", "#e15759"])
  .colors(labelsByCategory.length)

  return (
    <div>
      <TextHeader title="Thống kê" />

      {/* ==== TOP WIDGETS ==== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-4"
      >
        <CRow xs={{ gutter: 4 }}>
          <MotionCol sm={6} lg={3} whileHover={{ scale: 1.03 }}>
            <DashboardWidget
              color="primary"
              title="Doanh thu"
              value="₫9.000.000"
              percent={40.9}
              trend="up"
              chartType="line"
              chartData={[65, 59, 84, 84, 51, 55, 40]}
            />
          </MotionCol>

          <MotionCol sm={6} lg={3} whileHover={{ scale: 1.03 }}>
            <DashboardWidget
              color="info"
              title="Đơn hàng"
              value={totals.orderCount || "0"}
              percent={12.5}
              trend="up"
              chartType="line"
              chartData={[1, 18, 9, 17, 34, 22, 11]}
            />
          </MotionCol>

          <MotionCol sm={6} lg={3} whileHover={{ scale: 1.03 }}>
            <DashboardWidget
              color="warning"
              title="Tồn kho"
              value={totals.productsQuantityTotal || "0"}
              percent={-5.2}
              trend="down"
              chartType="line"
              chartData={[78, 81, 80, 45, 34, 12, 40]}
            />
          </MotionCol>

          <MotionCol sm={6} lg={3} whileHover={{ scale: 1.03 }}>
            <DashboardWidget
              color="danger"
              title="Sản phẩm"
              value={totals.productCount || "0"}
              percent={8.3}
              trend="up"
              chartType="bar"
              chartData={[78, 81, 80, 45, 34, 12, 40]}
            />
          </MotionCol>
        </CRow>
      </motion.div>

      {/* ==== BAR CHARTS ==== */}
      <CRow className="my-4">
        <CCol md={6}>
          <MyBarChart {...categoryData} />
        </CCol>

        <CCol md={6}>
          <MyBarChart {...manufacturerData} />
        </CCol>
      </CRow>

      {/* ==== LINE CHARTS ==== */}
      <CRow className="my-4">
        <CCol md={6}>
          <CCard>
            <CCardHeader>Doanh thu theo tuần</CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Doanh thu (VND)",
                      data: revenue,
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 4,
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard>
            <CCardHeader>Biểu đồ doanh thu theo danh mục</CCardHeader>
            <CCardBody className="mx-auto">
              <CChartPie
                data={{
                  labels: labelsByCategory,
                  datasets: [
                    {
                      data: revenueByCategory,
                      backgroundColor: colors,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                style={{ height: '325px' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ==== LOADING ==== */}
      <MyFullSpinner
        show={loadingTotals || loadingCategory || loadingManu || loadingRevenue}
      />
    </div>
  );
};

export default Dashboard;
