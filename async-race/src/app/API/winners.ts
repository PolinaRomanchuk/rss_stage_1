import type { Winner } from "../../types/types";
const BASE_URL = 'http://127.0.0.1:3000';

export async function getWinners(page: number, limit: number, sortBy: 'id' | 'wins' | 'time', sortOrder: 'ASC' | 'DESC',
): Promise<{ winners: Winner[]; totalCount: number }> {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${sortOrder}`,
  );
  if (!response.ok) throw new Error('Error fetching winners');

  const data = await response.json();
  const totalCount = response.headers.get('X-Total-Count');

  return { winners: data, totalCount: Number(totalCount) };
}

export async function getWinner(id: number): Promise<Winner | null> {
  const response = await fetch(`${BASE_URL}/winners/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Error fetching winner');
  }

  return await response.json();
}

export async function createWinner(winner: Winner): Promise<void> {
  const response = await fetch(`${BASE_URL}/winners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });

  if (!response.ok) throw new Error('Error creating winner');

  return await response.json();
}

export async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error deleting winner');
}

export async function updateWinner(id: number, winner: { wins: number; time: number }): Promise<void> {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winner),
  });

  if (!response.ok) throw new Error('Error updating winner');
}
