import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/get_codes_country", async (_, res) => {
  try {
    // Realizar la solicitud HTTP a la URL especificada
    const response = await axios.get(
      "https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/countries?fields=ALL&language=ES&offset=1&limit=1000",
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/get_codes_city", async (_, res) => {
  try {
    // Realizar la solicitud HTTP a la URL especificada
    const response = await axios.get(
      "https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/destinations?fields=ALL&language=es&countryCodes=US",
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/get_vehicles", async (_, res) => {
  try {
    // Realizar la solicitud HTTP a la URL especificada
    const response = await axios.get(
      "https://api.test.hotelbeds.com/transfer-cache-api/1.0/masters/transferTypes?fields=ALL&language=es&offset=1&limit=100",
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/get_hotels", async (_, res) => {
  try {
    // Realizar la solicitud HTTP a la URL especificada
    const response = await axios.get(
      "https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=ALL&language=es&countryCodes=ES&destinationCodes=PMI&limit=50",
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", (_, res) => {
  res.send("Got a POST request");
});

export default router;
