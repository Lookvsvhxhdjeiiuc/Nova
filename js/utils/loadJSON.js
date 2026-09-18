export async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Kunne ikke indlæse "${path}"`);
  return response.json();
}
