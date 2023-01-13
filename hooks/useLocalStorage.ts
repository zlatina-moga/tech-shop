import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  let item;
  useEffect(() => {
    item = localStorage.getItem(key);
  }, [])

  const [state, setState] = useState(() => {
    try {
        return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  });

  const setItem = (value) => {
    try {
      if (typeof window != undefined) {
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
