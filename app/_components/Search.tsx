import React from "react";

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
    <div
      style={{
        position: "absolute",
        top: "20px", // 上部にスペースを確保
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <input
        type="text"
        placeholder="世界遺産を検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "8px",
          fontSize: "16px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleSearchClick}
        style={{
          padding: "8px 16px",
          fontSize: "16px",
          marginLeft: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        検索
      </button>
    </div>
  );
};

export default Search;
