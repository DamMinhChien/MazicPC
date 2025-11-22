import axiosClient from "./axiosClient";

const momoService = {
    createPayment: async (orderId) => {
        const res = await axiosClient.post(`MoMo/create-payment`, { orderId });
        return res.data;
    },
    refundPayment: async (orderId) => {
        const res = await axiosClient.post(`MoMo/refund-payment`, { orderId });
        return res.data;
    }
}
export default momoService;