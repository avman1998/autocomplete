import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  console.log("cache", cache);
  async function fetchData() {
    try {
      if (cache[input]) {
        setResults(cache[input]);
        return;
      }
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );
      const data = await res.json();
      setResults(data?.recipes);
      setCache((prev) => ({ ...prev, [input]: data?.recipes }));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);
  return (
    <div className="autocomplete-container">
      <h1 className="head">Autocomplete search</h1>
      <div>
        <input
          type="text"
          placeholder="Search recipe"
          className="search-input"
          onChange={(e) => setInput(e.target.value)}
          onFocus={(e) => setShowOptions(true)}
          onBlur={(e) => setShowOptions(false)}
        />
        {showOptions && (
          <div className="options-container">
            {results?.map((r) => {
              return (
                <div className="options" key={r?.id}>
                  {r.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
