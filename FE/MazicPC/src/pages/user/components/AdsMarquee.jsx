import Marquee from "react-fast-marquee";

const ads = [
  "🚀 Flash Sale hôm nay: Laptop Gaming giảm đến 20% tại MazicPC!",
  "🎁 Miễn phí vận chuyển cho đơn hàng trên 1 triệu đồng – Chỉ có tại MazicPC!",
  "💻 Laptop cấu hình mạnh, giá tốt – Chọn ngay để nâng cấp trải nghiệm!",
  "🔥 Khuyến mãi HOT: Mua laptop tặng phụ kiện xịn – Chỉ hôm nay!",
  "⭐ MazicPC – Nơi hội tụ laptop gaming, văn phòng và cao cấp chính hãng!",
];

const AdsMarquee = () => {
  return (
    <div className="bg-app-accent py-1">
      <Marquee
        speed={50} // tốc độ chạy
        gradient={false} // tắt gradient 2 đầu
        pauseOnHover={true} // dừng khi hover
      >
        {ads.map((text, index) => (
          <span
            key={index}
            style={{
              marginRight: "50px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {text}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default AdsMarquee;
