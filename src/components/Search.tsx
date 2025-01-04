import useSearchValidation from "@/hooks/useSearchValidation";
import Magnifying from "@/icons/Magnifying";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function Search() {
  const inputElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const { error, validateQuery } = useSearchValidation(query);

  const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateQuery()) {
      navigate(`/search?searchProducts=${query}`);

      if (inputElement.current) {
        inputElement.current.value = "";
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearchProduct}
        className="flex w-full items-center justify-center gap-2"
        data-testid="search-form"
      >
        <input
          data-testid="search-input"
          className="flex-1 rounded-md border border-teal-900 p-1 tracking-wide outline-none outline-2 focus:outline-sky-700 lg:text-xl"
          type="text"
          placeholder="Mascara..."
          ref={inputElement}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <button>
          <Magnifying />
        </button>
      </form>
      {error && (
        <div className="mt-1 font-medium tracking-wide text-red-700">
          {error}
        </div>
      )}
    </>
  );
}

export default Search;
