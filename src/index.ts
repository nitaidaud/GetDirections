import { HttpsError, onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { CalculateDirections } from "./utils/calculateDirections";
import { IsValidLatLng } from "./utils/validateData";

admin.initializeApp();

export const GetDirections = onCall<GetDirectionsRequest>(
  { region: "me-west1" },
  async ({ data }) => {
    // Validate input
    if (!data.start || !data.destination) {
      throw new HttpsError(
        "invalid-argument",
        "Missing required fields: start and destination",
      );
    }

    if (!IsValidLatLng(data.start)) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid start location format or values",
      );
    }

    if (!IsValidLatLng(data.destination)) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid destination location format or values",
      );
    }

    try {
      const start = data.start;
      const destination = data.destination;

        const direction = await CalculateDirections(start, destination);

      return direction;
    } catch (err) {
      console.log(`error: ${err}`);
      return null;
    }
  },
);
