const BASE_URL = 'http://127.0.0.1:3000';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export async function getWinners(
  page: number,
  limit: number,
): Promise<{ winners: Winner[]; totalCount: number }> {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}`,
  );
  if (!response.ok) throw new Error('Error');

  const data = await response.json();
  const totalCount = response.headers.get('X-Total-Count');

  return { winners: data, totalCount: Number(totalCount) };
}

export async function getWinner(id: number) {
  const response = await fetch(`${BASE_URL}/winners/${id}`);
  if (!response.ok) throw new Error('Error');

  const data = await response.json();
  return { winner: data };
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
