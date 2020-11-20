const ACCOUNT_DATA_KEY = 'accountData';

export function store(email: string): void {
  localStorage.setItem(
    ACCOUNT_DATA_KEY,
    btoa(
      JSON.stringify({
        email,
      }),
    ),
  );
}

export function get(): { email: string } | undefined {
  const storedData = localStorage.getItem(ACCOUNT_DATA_KEY);

  if (storedData) {
    try {
      const decodedData = JSON.parse(atob(storedData)) as {
        email: string;
      };

      return {
        email: decodedData.email,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return undefined;
}

export function clear(): void {
  localStorage.removeItem(ACCOUNT_DATA_KEY);
}
