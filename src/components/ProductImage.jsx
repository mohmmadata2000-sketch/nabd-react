// Renders the product's photo from /public/images/*.jpg.
// To use your own photos: open the project in VS Code, go to public/images/,
// and replace any file with your own image using the SAME filename
// (or change the "image" path for that product in src/data/products.js).

export default function ProductImage({ src, alt, size }) {
  const cls = size === "sm" ? "product-img sm" : size === "xs" ? "product-img xs" : "product-img";
  return <img className={cls} src={src} alt={alt} loading="lazy" />;
}
