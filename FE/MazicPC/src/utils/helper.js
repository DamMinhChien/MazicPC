export function formatCurrency(value, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
  }).format(value);
}

export function toEmbedUrl(url) {
  try {
    const u = new URL(url);

    // youtube.com/watch?v=xxxx
    if (u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }

    // youtu.be/xxxx
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }

    // Nếu URL đã là embed thì return nguyên
    if (url.includes("/embed/")) {
      return url;
    }

    return url; // fallback
  } catch (e) {
    return url;
  }
}


export function toPascalCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
