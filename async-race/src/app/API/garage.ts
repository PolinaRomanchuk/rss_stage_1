const BASE_URL = 'http://127.0.0.1:3000';

interface Car {
  name: string;
  color: string;
  id: number;
}

export async function getCars(page: number, limit: number)  {
  const response = await fetch(
    `${BASE_URL}/garage?_page=${page}&_limit=${limit}`,
  );
  if (!response.ok) throw new Error('Error');

  const data = await response.json();
  const totalCount = response.headers.get('X-Total-Count');

  return { cars: data, totalCount: Number(totalCount) };
}

export async function getCar(id: number) {
  const response = await fetch(`${BASE_URL}/garage/${id}`);
  if (!response.ok) throw new Error('Error');

  const data = await response.json();
  return { car: data };
}

export async function createCar(car: { name: string; color: string }) {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });

  if (!response.ok) throw new Error('Error');

  return await response.json();
}

export async function deleteCar(id: number) {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error');
}

export async function updateCar(
  id: number,
  car: { name: string; color: string },
) {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });

  if (!response.ok) throw new Error('Error');
}
