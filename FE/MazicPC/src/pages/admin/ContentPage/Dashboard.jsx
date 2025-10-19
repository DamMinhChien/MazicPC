import { CCol, CRow } from "@coreui/react";
import DashboardWidget from "../components/DashboardWidget";
import { useQuery } from "@tanstack/react-query";
import statsService from "../../../apis/statsService";
import MyFullSpinner from "@components/MyFullSpinner";
import { motion } from "framer-motion";
import TextHeader from "../../user/components/TextHeader";
import MyBarChart from "../components/MyBarChart";

const MotionCol = motion(CCol);

const Dashboard = () => {
  const { data: totalsData = {}, isLoading: isLoadingTotals } = useQuery({
    queryKey: ["stats", "dashboard"],
    queryFn: async () => statsService.getTotalsAdmin(),
  });

  const { data: categoryData = {}, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categoryData", "dashboard"],
    queryFn: async () => statsService.getStatisticByCategory(),
  });

  const { data: manufacturerData = {}, isLoading: isLoadingManufacturer } =
    useQuery({
      queryKey: ["manufacturerData", "dashboard"],
      queryFn: async () => statsService.getStatisticByManufacturer(),
    });

  return (
    <>
      <TextHeader title="Thống kê" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="my-5"
      >
        <CRow>
          <MotionCol
            sm={6}
            lg={3}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <DashboardWidget
              color="primary"
              title="Doanh thu"
              value="$9.000"
              percent={40.9}
              trend="up"
              chartType="line"
              chartData={[65, 59, 84, 84, 51, 55, 40]}
            />
          </MotionCol>

          <MotionCol
            sm={6}
            lg={3}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <DashboardWidget
              color="info"
              title="Đơn hàng"
              value={totalsData?.orderCount || "0"}
              percent={12.5}
              trend="up"
              chartType="line"
              chartData={[1, 18, 9, 17, 34, 22, 11]}
            />
          </MotionCol>

          <MotionCol
            sm={6}
            lg={3}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <DashboardWidget
              color="warning"
              title="Số lượng hàng tồn kho"
              value={totalsData?.productsQuantityTotal || "0"}
              percent={-5.2}
              trend="down"
              chartType="line"
              chartData={[78, 81, 80, 45, 34, 12, 40]}
            />
          </MotionCol>

          <MotionCol
            sm={6}
            lg={3}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <DashboardWidget
              color="danger"
              title="Số lượng sản phẩm"
              value={totalsData?.productCount || "0"}
              percent={8.3}
              trend="up"
              chartType="bar"
              chartData={[78, 81, 80, 45, 34, 12, 40, 85, 65, 23]}
            />
          </MotionCol>
        </CRow>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="my-5"
      >
        {/* <TextHeader title="Thống kê theo danh mục" className="mb-4" /> */}
        <CRow>
          <CCol md={6}>
            <MyBarChart
              data={categoryData.data}
              xKey={categoryData.xKey}
              yKeys={categoryData.yKeys}
              labels={categoryData.labels}
              colors={categoryData.colors} // bộ 1
              title={categoryData.title}
            />
          </CCol>
          <CCol md={6}>
            <MyBarChart
              data={manufacturerData.data}
              xKey={manufacturerData.xKey}
              yKeys={manufacturerData.yKeys}
              labels={manufacturerData.labels}
              colors={manufacturerData.colors} // bộ 1
              title={manufacturerData.title}
            />
          </CCol>
        </CRow>
      </motion.div>

      <MyFullSpinner
        show={isLoadingTotals || isLoadingCategory || isLoadingManufacturer}
      />
    </>
  );
};

export default Dashboard;
