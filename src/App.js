import "./App.css";
import { useEffect, useState } from "react";

// API: https://weather-service.getimpala.com/

const Form = ({ currentLocation, saveCurrentLocation, sendLocation }) => {
  return (
    <div>
      <label>Current Location</label>
      <input
        type="text"
        value={currentLocation}
        onChange={(e) => {
          saveCurrentLocation(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendLocation();
        }}
      >
        Submit
      </button>
    </div>
  );
};

function App() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [responseFromPost, setResponseFromPost] = useState({});
  const [responseFromGet, setResponseFromGet] = useState({});

  const saveCurrentLocation = (value) => {
    setCurrentLocation(value);
  };

  let ada = {};
  console.log("🚀 ~ ada", ada);

  // const getWheaterParameters = (json) => {
  //   // console.log("responseFromPost", responseFromPost);
  //   const baseUri = "https://weather-service-api.getimpala.com/api/v1";

  //   fetch(
  //     `${baseUri}/weather?latitude=${json.latitude}&longitude=${json.longitude}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer falafel",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setResponseFromGet(json);
  //     });
  // };

  const getWheaterParameters = async (json) => {
    // console.log("responseFromPost", responseFromPost);
    const baseUri = "https://weather-service-api.getimpala.com/api/v1";

    const response = await fetch(
      `${baseUri}/weather?latitude=${json.latitude}&longitude=${json.longitude}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer falafel",
        },
      }
    );

    const data = await response.json();

    setResponseFromGet(data);
  };

  const sendLocation = () => {
    const baseUri = "https://weather-service-api.getimpala.com/api/v1";

    fetch(`${baseUri}/locations/search`, {
      method: "POST",
      body: JSON.stringify({ name: currentLocation }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer falafel",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("🚀 ~ file: App.js ~ line 69 ~ .then ~ json", json);
        setResponseFromPost(json);
        getWheaterParameters(json);
      });
  };

  // useEffect(() => {
  //   console.log("times");
  //   // if (Object.keys(responseFromPost).includes("latitude")) {
  //   const baseUri = "https://weather-service-api.getimpala.com/api/v1";

  //   fetch(
  //     `${baseUri}/weather?latitude=${responseFromPost.latitude}&longitude=${responseFromPost.longitude}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer falafel",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setResponseFromGet(json));
  //   // }
  // }, [responseFromPost]);

  // console.log(
  //   'Object.values(responseFromGet).includes("chanceOfRain")',
  //   Object.values(responseFromGet).includes("chanceOfRain")
  // );

  const isUmbrellaRequired = () => {
    const { chanceOfRain, accuracyOfReport } = responseFromGet;

    const umbrellaRequired =
      chanceOfRain >= 0.5 && accuracyOfReport >= 0.75 ? true : false;

    return umbrellaRequired;
  };

  return (
    <div className="App">
      <Form
        currentLocation={currentLocation}
        saveCurrentLocation={saveCurrentLocation}
        sendLocation={sendLocation}
      />
      {/* {Object.keys(responseFromPost).includes("latitude") && (
        <div>
          <p>Your coordinates are:</p>
          <p>{responseFromPost.latitude}</p>
          <p>{responseFromPost.longitude}</p>
        </div>
      )} */}
      {Object.keys(responseFromGet).includes("chanceOfRain") &&
        (isUmbrellaRequired() ? (
          <p>Enjoy the day you will not need an umbrella today</p>
        ) : (
          <p>We recomend you to take your umbrella today</p>
        ))}
    </div>
  );
}

export default App;

// fetch("url", {
//   method: "POST",
//   body: JSON.stringify("values"),
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer token",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log("error"));

// fetch("url", {
//   method: "GET",
//   headers: {
//     Authorization: "Bearer token",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json))
//   .catch((error) => console.logg("solicitud fallida", error));

// fetch("url", {
//   method: "POST",
//   body: JSON.stringify("values"),
//   headers: {
//     "content-Type": "application/json",
//     Authorization: "Bearer token",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// fetch("url", {
//   method: "GET",
//   headers: {
//     Authorization: "Bearer token",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));
