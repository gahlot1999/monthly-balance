export function formatCurrency(value) {
  let rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    currencyDisplay: 'symbol',
  });

  return rupee.format(value);
}

export function formatInputCurrency(value) {
  return formatCurrency(Number(value.replace(/[^0-9]/g, '')));
}
