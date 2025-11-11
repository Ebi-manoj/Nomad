export function latlangFormat(data: [number, number], latlng = true) {
  if (latlng) {
    const result = { lat: data[0], lng: data[1] };
    return result;
  } else {
    const result = { lat: data[1], lng: data[0] };
    return result;
  }
}
