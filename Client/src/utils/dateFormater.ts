export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function timeFormater(num: number) {
  const now = new Date();
  const departureTime = new Date(now.getTime() + num * 60 * 1000);
  const dep = departureTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return dep;
}

export function formatDuration(start: Date, end: Date) {
  const diffMs = Math.abs(new Date(end).getTime() - new Date(start).getTime());

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';
  if (hours > 0) result += `${hours} hr `;
  if (minutes > 0) result += `${minutes} min`;

  return result.trim();
}
