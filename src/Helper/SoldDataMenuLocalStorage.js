export default function DataSoldMenu() {
  const getOrderMenu = JSON.parse(localStorage.getItem("soldMenu"));
  return getOrderMenu;
}
