import {
  Client,
  DirectionsResponseData,
} from "@googlemaps/google-maps-services-js";
import * as dotenv from "dotenv";

const client = new Client({});

dotenv.config();

const apiKey = process.env.API_KEY?.toString();
const restriction = process.env.RESTRICTION?.toString();
const packageName = process.env.PACKAGE?.toString();

export const CalculateDirections = async (
  start: LatLng,
  destination: LatLng,
): Promise<DirectionsResponseData | null> => {
  if (apiKey && restriction && packageName) {
    const response = await client
      .directions({
        headers: {
          "X-Android-Package": packageName,
          "X-Android-Cert": restriction,
        },
        params: {
          origin: `${start.latitude},${start.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          key: apiKey,
        },
      })
      .then((responseData) => {
        return responseData.data;
      })
      .catch((err) => {
        console.error(`error get direction: ${err}`);
        throw err;
      });

    return response;
  }
  return null;
};
