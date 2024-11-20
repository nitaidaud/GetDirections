export const IsValidLatLng = (location: LatLng): boolean => {
  return (
    typeof location.latitude === "number" &&
    typeof location.longitude === "number" &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
};
