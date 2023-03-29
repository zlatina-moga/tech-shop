import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      let item;
      if (typeof window !== undefined && localStorage !== undefined ) {
        item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setItem = (value) => {
    try {
      if (typeof window !== undefined && localStorage !== undefined  ) {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [state, setItem];
};

export default useLocalStorage;
