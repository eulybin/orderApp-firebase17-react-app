import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await res.json();

        let loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [url]);

  return { meals, isLoading, error };
};

export default useFetch;
