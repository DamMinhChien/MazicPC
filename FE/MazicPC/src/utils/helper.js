export function formatCurrency(value, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
  }).format(value);
}

export function toEmbedUrl(url) {
  return url.replace("watch?v=", "embed/");
}

