import { useState } from 'react';

function usePlanets() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }

      const json = await response.json();
      json.results.forEach((result) => {
        delete result.residents;
      });
      const { results } = json;
      return results;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makeFetch, isLoading, errors,
  };
}

export default usePlanets;
