import React from "react";
import styles from "@/app/global.module.css";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchClick: () => void;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchClick,
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="世界遺産を検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput} // クラス名を適用
      />
      <button
        onClick={handleSearchClick}
        className={styles.searchButton} // クラス名を適用
      >
        検索
      </button>
    </div>
  );
};

export default Search;
