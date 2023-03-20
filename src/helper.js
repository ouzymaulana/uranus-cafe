export default function DataOrderMenu() {
  const getOrderMenu = JSON.parse(localStorage.getItem("orderMenu"));
  return getOrderMenu;
}
