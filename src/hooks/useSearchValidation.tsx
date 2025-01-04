import { useState } from "react";

const useSearchValidation = (query: string) => {
  const [error, setError] = useState<string | null>(null);

  const validateQuery = () => {
    if (!query) {
      setError("Please enter a product to search");
      return false;
    }
    if (query.length < 3) {
      setError("Please enter at least 3 characters");
      return false;
    }
    if (query.length >= 40) {
      setError("You can only enter up to 40 characters");
      return false;
    }
    if (!/^[a-zA-Z]*$/.test(query)) {
      setError("You can enter alphabetic characters only.");
      return false;
    }
    setError(null);
    return true;
  };

  return { error, validateQuery };
};

export default useSearchValidation;
