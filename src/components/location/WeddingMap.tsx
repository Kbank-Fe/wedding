import { Map, MapMarker } from 'react-kakao-maps-sdk';

const WeddingMap = () => {
  const lat = 37.5665;
  const lng = 126.978;

  return (
    <Map
      center={{ lat, lng }}
      level={3}
      style={{ width: '100%', height: '300px' }}
    >
      <MapMarker position={{ lat, lng }}>
        <div style={{ padding: '5px', fontSize: '0.9rem' }}>예식장 위치</div>
      </MapMarker>
    </Map>
  );
};

export default WeddingMap;
