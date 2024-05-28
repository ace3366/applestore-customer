export default function priceConverter(price) {
  // Biến đổi number sang string rồi chèn dấu chấm bằng regular expression
  if (price !== undefined) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  }
}
