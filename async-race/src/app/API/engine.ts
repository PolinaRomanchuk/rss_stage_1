const BASE_URL = 'http://127.0.0.1:3000';

export async function startOrStopEngine(
  id: number,
  status: string,
): Promise<{ velocity: number; distance: number }> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  if (!response.ok) throw new Error('Error');
  const data = await response.json();
  return { velocity: data.velocity, distance: data.distance };
}

export async function switchDriveMode(
  id: number,
  status: string,
): Promise<{ success: boolean }> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  if (!response.ok) throw new Error('Error');
  const data = await response.json();
  return { success: data.success };
}
