import React from "react";
import styles from "@/app/global.module.css";

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
      <div className={styles.resultListContainer}>
        {places.map((place) => (
          <div
            key={place.place_id}
            onClick={() => handlePlaceClick(place)}
            className={`${styles.resultItem} ${
              selectedPlace?.place_id === place.place_id
                ? styles.selectedResultItem
                : ""
            }`}
          >
            {place.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
