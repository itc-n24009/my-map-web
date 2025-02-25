"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Search from "@/app/_components/Search";
import ResultList from "@/app/_components/ResultList";
import { usePlacesSearch } from "./usePlacesSearch";
import { heritageSites } from "./heritage-example";

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // 検索キーワード
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // 選択された場所
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // 地図の中心座標
  const [showResults, setShowResults] = useState(false); // 検索結果の表示状態
  const [isMapView, setIsMapView] = useState(false); // 地図を全画面表示するかどうか

  const { places, loadPlaces } = usePlacesSearch(searchQuery, mapCenter);

  // 検索ボタンクリック時の処理
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      loadPlaces();
      setShowResults(true); // 検索時にリストを表示
    }
  };

  // リストから場所を選択したときの処理
  const handlePlaceClick = (place: any) => {
    setSelectedPlace(place);
    setMapCenter(place.geometry.location);
    setIsMapView(true); // 地図をフルスクリーン表示
  };

  const closeResults = () => {
    setShowResults(false);
  };

  // 地図から検索画面に戻る
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
          {/* 検索コンポーネント */}
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchClick={handleSearchClick}
          />

          {/* 世界遺産リスト */}
          <div
            style={{
              marginTop: "140px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>世界遺産一覧(例)</h3>
            <ResultList
              places={heritageSites}
              handlePlaceClick={handlePlaceClick}
              selectedPlace={selectedPlace}
              closeResults={() => {}} // 閉じるボタンなし
            />
          </div>

          {/* 検索結果（検索後に表示） */}
          {showResults && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <h3>検索結果</h3>

              {/* 閉じるボタンを配置 */}
              <button
                onClick={closeResults}
                style={{
                  marginTop: "5px",
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
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

      {/* 地図表示 */}
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

      {/* 戻るボタン */}
      {isMapView && (
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            bottom: "1px",
            left: "17px",
            zIndex: 2,
            padding: "10px 20px",
            fontSize: "20px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          戻る
        </button>
      )}
    </LoadScript>
  );
};

export default MyComponent;
