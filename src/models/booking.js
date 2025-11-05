class Booking {
  constructor({ id, carId, customerId, startDate, endDate, days, totalPrice }) {
    this.id = id;
    this.carId = carId;
    this.customerId = customerId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.days = days;
    this.totalPrice = totalPrice;
  }
}

export default Booking;
