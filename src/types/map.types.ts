export type LatLng = { lat: number; lng: number };

export type DaumPostcodeData = { address: string };
export type PostcodeCtor = new (opts: {
  oncomplete: (data: DaumPostcodeData) => void;
}) => { open: () => void };
export type DaumWindow = { daum?: { Postcode: PostcodeCtor } };

export type AddressSearchProps = {
  buttonText?: string;
  onSelect: (address: string) => void;
  disabled?: boolean;
};

export type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';
export type KakaoGeocode = { x: string; y: string };
export type Geocoder = {
  addressSearch: (
    query: string,
    callback: (res: KakaoGeocode[], status: KakaoStatus) => void,
  ) => void;
};
export type KakaoWindow = {
  kakao?: {
    maps: {
      services: {
        Geocoder: new () => Geocoder;
      };
    };
  };
};
