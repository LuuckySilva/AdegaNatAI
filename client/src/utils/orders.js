export function getSavedOrders() {
  return (
    JSON.parse(localStorage.getItem("adegaNatOrders"))?.orders || []
  )
}

export function getMonthlyRevenue() {
  const orders = getSavedOrders()

  return orders.reduce(
    (acc, order) => acc + order.total,
    0
  )
}

export function getNextOrderNumber() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const savedData =
    JSON.parse(localStorage.getItem("adegaNatOrders")) || {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

  if (
    savedData.month !== currentMonth ||
    savedData.year !== currentYear
  ) {
    const resetData = {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify(resetData)
    )

    return 1
  }

  return savedData.lastOrderNumber + 1
}

export function saveOrder(order) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const savedData =
    JSON.parse(localStorage.getItem("adegaNatOrders")) || {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

  const updatedData = {
    ...savedData,
    month: currentMonth,
    year: currentYear,
    lastOrderNumber: order.number,
    orders: [...savedData.orders, order],
  }

  localStorage.setItem(
    "adegaNatOrders",
    JSON.stringify(updatedData)
  )
}