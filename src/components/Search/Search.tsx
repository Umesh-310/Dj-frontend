import React, { FormEvent, useState } from "react";
import style from "./Search.module.css";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/events/search?term=${searchInput}`);
    setSearchInput("");
  };
  return (
    <div className={style.search}>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Search'
        />
      </form>
    </div>
  );
};

export default Search;
