export class CoordinateSystem {
  longitude: number;
  latitude: number;
  zodiacHouseSystem: string;
  zodiacSystem: string;

  constructor(
    latitude: number,
    longitude: number,
    houseSystem: string,
    zodiacSystem: string
  ) {
    this.longitude=longitude;
    this.latitude=latitude;
    this.zodiacHouseSystem=houseSystem;
    this.zodiacSystem=zodiacSystem;
  }
}
