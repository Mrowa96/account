const ACCOUNT_DATA_KEY = 'accountData';

export function store(email: string): void {
  localStorage.setItem(
    ACCOUNT_DATA_KEY,
    btoa(
      JSON.stringify({
        lastLoginTimestamp: Date.now(),
        email,
      }),
    ),
  );
}

export function get(): { email: string; lastLoginDate: Date } | undefined {
  const storedData = localStorage.getItem(ACCOUNT_DATA_KEY);

  if (storedData) {
    try {
      const decodedData = JSON.parse(atob(storedData)) as {
        email: string;
        lastLoginTimestamp: number;
      };

      return {
        email: decodedData.email,
        lastLoginDate: new Date(decodedData.lastLoginTimestamp),
      };
    } catch (error) {
      console.error(error);
    }
  }

  return undefined;
}

export function has(): boolean {
  return !!localStorage.getItem(ACCOUNT_DATA_KEY);
}

export function clear(): void {
  localStorage.removeItem(ACCOUNT_DATA_KEY);
}
