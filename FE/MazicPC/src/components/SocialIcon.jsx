const SocialIcon = ({ icon, link, size = 40, bgColor = "#333" }) => {
  return (
    <>
      <a
        href={link}
        className="d-flex justify-content-center align-items-center rounded-circle text-white"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${bgColor}`,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = `${bgColor}CC`)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)}
      >
        <span style={{ fontSize: size * 0.5 }}>{icon}</span>
      </a>
    </>
  );
};

export default SocialIcon;
