export function formatCurrency(amount: number): string {
  return amount.toLocaleString('th-TH')
}

export function formatDateToThai(date: string) {
  return new Date(date).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  })
}