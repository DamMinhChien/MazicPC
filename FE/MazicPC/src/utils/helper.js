export function formatCurrency(value, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
  }).format(value);
}

export function toEmbedUrl(url) {
  return url.replace("watch?v=", "embed/");
}

export function toPascalCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
