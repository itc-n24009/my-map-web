"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Search from "@/app/_components/Search";
import ResultList from "@/app/_components/ResultList";
import { usePlacesSearch } from "./usePlacesSearch";
import { heritageSites } from "./heritage-example";
import styles from "@/app/global.module.css";

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 検索キーワード
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // 選択された場所
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // 地図の中心座標
  const [showResults, setShowResults] = useState(false); // 検索結果の表示状態
  const [isMapView, setIsMapView] = useState(false); // 地図を全画面表示するかどうか

  const { places, loadPlaces } = usePlacesSearch(searchQuery, mapCenter);

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      loadPlaces();
      setShowResults(true);
    }
  };

  const handlePlaceClick = (place: any) => {
    setSelectedPlace(place);
    setMapCenter(place.geometry.location);
    setIsMapView(true);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const handleBack = () => {
    setIsMapView(false);
    setSelectedPlace(null);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
      libraries={["places"]}
    >

        {!isMapView && (
          <>
            <h1 className={styles.title}>世界遺産サーチ</h1>

            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchClick={handleSearchClick}
            />

            <div className={styles.searchContainer}>
              <h3>世界遺産一覧(例)</h3>
              <ResultList
                places={heritageSites}
                handlePlaceClick={handlePlaceClick}
                selectedPlace={selectedPlace}
                closeResults={() => {}}
              />
            </div>

            {showResults && (
              <div className={styles.resultContainer}>
                <h3>検索結果</h3>

                <button onClick={closeResults} className={styles.closeButton}>
                  閉じる
                </button>

                <ResultList
                  places={places}
                  handlePlaceClick={handlePlaceClick}
                  selectedPlace={selectedPlace}
                  closeResults={closeResults}
                />
              </div>
            )}
          </>
        )}
        {isMapView && selectedPlace && (
          <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100%" }}
            center={selectedPlace.geometry.location}
            zoom={17}
          >
            <Marker
              position={selectedPlace.geometry.location}
              title={selectedPlace.name}
            />
          </GoogleMap>
        )}
        {isMapView && (
          <button onClick={handleBack} className={styles.backButton}>
            戻る
          </button>
        )}
    </LoadScript>
  );
};

export default MyComponent;
