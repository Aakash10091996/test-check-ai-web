/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import uuidv4 from "uuid4";

export const getRandomLink = (link?: string): string => {
  return `${link}?time=${uuidv4()}`;
};

export async function fetchDSLData(url: string | URL | Request | undefined): Promise<unknown> {
  try {
    const response = await fetch(url!);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
