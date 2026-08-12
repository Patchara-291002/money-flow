const DAY_LABELS: Record<number, string> = {
  0: 'อา',
  1: 'จ',
  2: 'อ',
  3: 'พ',
  4: 'พฤ',
  5: 'ศ',
  6: 'ส',
}

export function formatDayLabel(dateString: string): string {
  const date = new Date(dateString)
  return DAY_LABELS[date.getDay()]
}