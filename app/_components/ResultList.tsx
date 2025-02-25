import React from "react";

interface Result {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface ResultListProps {
  places: Result[];
  handlePlaceClick: (place: Result) => void;
  selectedPlace: Result | null;
  closeResults?: () => void; // ? を追加してオプションに
}

const ResultList: React.FC<ResultListProps> = ({
  places,
  handlePlaceClick,
  selectedPlace,
}) => {
  return (
    <div>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "10px",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {places.map((place) => (
          <div
            key={place.place_id}
            onClick={() => handlePlaceClick(place)}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
              backgroundColor:
                selectedPlace?.place_id === place.place_id
                  ? "#f0f0f0"
                  : "white",
              color: "#333",
              fontSize: "16px",
            }}
          >
            {place.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
