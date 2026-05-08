export function getSavedOrders() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const savedData = JSON.parse(
    localStorage.getItem("adegaNatOrders")
  )

  if (!savedData) {
    return []
  }

  if (
    savedData.month !== currentMonth ||
    savedData.year !== currentYear
  ) {
    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify({
        month: currentMonth,
        year: currentYear,
        lastOrderNumber: 0,
        orders: [],
      })
    )

    return []
  }

  return savedData.orders || []
}

export function getNextOrderNumber() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const savedData =
    JSON.parse(
      localStorage.getItem("adegaNatOrders")
    ) || {
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
      lastOrderNumber: 1,
      orders: [],
    }

    localStorage.setItem(
      "adegaNatOrders",
      JSON.stringify(resetData)
    )

    return 1
  }

  savedData.lastOrderNumber += 1

  localStorage.setItem(
    "adegaNatOrders",
    JSON.stringify(savedData)
  )

  return savedData.lastOrderNumber
}

export function saveOrder(order) {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const savedData =
    JSON.parse(
      localStorage.getItem("adegaNatOrders")
    ) || {
      month: currentMonth,
      year: currentYear,
      lastOrderNumber: 0,
      orders: [],
    }

  savedData.orders.push(order)

  localStorage.setItem(
    "adegaNatOrders",
    JSON.stringify(savedData)
  )
}