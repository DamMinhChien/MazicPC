const icons = ["❄️", "🍂", "🌟", "☃️", "🍁"];

export default function Snowfall({ count = 50 }) {
  const handleClick = (e) => {
    const direction = Math.random() > 0.5 ? "left" : "right";
    const iconEl = e.currentTarget.querySelector(".icon-spin");

    if (iconEl) {
      // Tắt animation hiện tại để tránh xung đột
      iconEl.style.animation = "none";

      // Force reflow để đảm bảo animation áp dụng lại
      iconEl.offsetHeight;

      // Thêm class hiệu ứng bay
      iconEl.classList.add(`blow-${direction}`);

      // Reset sau khi bay xong để có thể bay tiếp lần sau
      setTimeout(() => {
        iconEl.classList.remove(`blow-${direction}`);
        iconEl.style.animation = `spin 10s linear infinite`;
      }, 1500);
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 10;
        const icon = icons[Math.floor(Math.random() * icons.length)];

        return (
          <span
            key={i}
            className="snowflake"
            style={{
              position: "absolute",
              top: "-50px",
              left: `${left}%`,
              animation: `fall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              pointerEvents: "auto",
              zIndex: 999,
            }}
            onClick={handleClick}
          >
            <span
              className="sway-layer"
              style={{
                display: "inline-block",
                animation: `sway ${duration / 2}s ease-in-out infinite alternate`,
              }}
            >
              <span
                className="icon-spin"
                style={{
                  display: "inline-block",
                  fontSize: size,
                  animation: `spin ${duration}s linear infinite`,
                  transition: "transform 1s ease, opacity 1s ease",
                }}
              >
                {icon}
              </span>
            </span>
          </span>
        );
      })}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }

        @keyframes sway {
          0% { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes blow-left {
          0% {
            transform: none;
            opacity: 1;
          }
          100% {
            transform: translateX(-150vw) rotate(-720deg) scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes blow-right {
          0% {
            transform: none;
            opacity: 1;
          }
          100% {
            transform: translateX(150vw) rotate(720deg) scale(1.2);
            opacity: 0.4;
          }
        }

        .blow-left {
          animation: blow-left 1.5s ease-out forwards !important;
        }

        .blow-right {
          animation: blow-right 1.5s ease-out forwards !important;
        }

        .icon-spin:hover {
          transform: scale(1.5) translateX(20px) rotate(360deg);
        }

        .snowflake:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
