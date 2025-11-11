export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeFormater(num: number) {
  const now = new Date();
  const departureTime = new Date(now.getTime() + num * 60 * 1000);
  const dep = departureTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return dep;
}
