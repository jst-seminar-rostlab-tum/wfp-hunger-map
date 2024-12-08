import { useEffect, useState } from 'react';

export const useDebounce = (input: string, msDelay: number) => {
  const [output, setOutput] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(input);
    }, msDelay);

    return () => clearTimeout(timeout);
  }, [input, msDelay]);
  return output;
};
