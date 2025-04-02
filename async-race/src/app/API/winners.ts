const BASE_URL = 'http://127.0.0.1:3000';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export async function getWinners(
  page: number,
  limit: number,
  sortBy: 'id' | 'wins' | 'time',
  sortOrder: 'ASC' | 'DESC',
): Promise<{ winners: Winner[]; totalCount: number }> {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${sortOrder}`,
  );
  if (!response.ok) throw new Error('Error');

  const data = await response.json();
  const totalCount = response.headers.get('X-Total-Count');

  return { winners: data, totalCount: Number(totalCount) };
}

export async function getWinner(
  id: number,
): Promise<{ id: number; wins: number; time: number } | null> {
  const response = await fetch(`${BASE_URL}/winners/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Error');
  }

  return await response.json();
}

export async function createWinner(winner: {
  id: number;
  wins: number;
  time: number;
}) {
  const response = await fetch(`${BASE_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });

  if (!response.ok) throw new Error('Error');

  return await response.json();
}

export async function deleteWinner(id: number) {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error');
}

export async function updateWinner(
  id: number,
  winner: { wins: number; time: number },
) {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });

  if (!response.ok) throw new Error('Error');
}
