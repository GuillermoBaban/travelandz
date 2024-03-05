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
    res.status(500).send("Error obtaining country codes.");
  }
});

router.post("/get_codes_city", async (req, res) => {
  try {
    const { countryCode } = req.body; // Extraer countryCode del cuerpo de la solicitud
    const response = await axios.get(
      `https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/destinations?fields=ALL&language=es&countryCodes=${countryCode}`,
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obtaining city codes.");
  }
});

router.post("/get_availability", async (req, res) => {
  try {
    const { selectFrom } = req.body;
    const { selectTo } = req.body;

    const { numberAdults } = req.body;
    const { numberChildren } = req.body;
    const { numberInfants } = req.body;

    const { dateFrom } = req.body;
    const { dateTo } = req.body;

    const { selectedHotelFrom } = req.body;
    const { selectedHotelTo } = req.body;

    const { selectedCityTo } = req.body;
    const { selectedCityFrom } = req.body;

    const response = await axios.get(
      `https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/from/${selectFrom}/${
        selectFrom == "ATLAS" ? selectedHotelFrom : selectedCityFrom
      }/to/${selectTo}/${
        selectTo == "ATLAS" ? selectedHotelTo : selectedCityTo
      }/${dateFrom}${
        dateTo ? `/${dateTo}` : ""
      }/${numberAdults}/${numberChildren}/${numberInfants}`,
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response?.data?.services);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obtaining availability.");
  }
});

router.post("/get_hotels", async (req, res) => {
  try {
    const { countryCode } = req.body;
    const { cityCode } = req.body;
    const response = await axios.get(
      `https://api.test.hotelbeds.com/transfer-cache-api/1.0/hotels?fields=ALL&language=es&countryCodes=${countryCode}&destinationCodes=${cityCode}&limit=50`,
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obtaining hotels.");
  }
});

router.post("/confirm_transfer", async (req, res) => {
  let dataSend = {
    language: "en",
    holder: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
    },
    transfers: [
      {
        rateKey: req.body.transfer.rateKey,
        transferDetails: [
          {
            type: req.body.transferDetailType,
            direction: req.body.transfer.direction,
            code: req.body.transferDetailCode,
            companyName: req.body.transferDetailCompany,
          },
        ],
      },
    ],
    clientReference: req.body.clientReference,
    welcomeMessage: `Welcome ${req.body.name} ${req.body.surname}!`,
    remark: req.body.comments,
  };

  try {
    const response = await axios.post(
      `https://api.test.hotelbeds.com/transfer-api/1.0/bookings`,
      dataSend,
      {
        headers: {
          "Api-key": process.env.API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error confirming transfer.");
  }
});

export default router;
