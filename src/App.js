import Particle from "./components/Particle/Particle";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import { useState } from "react";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

function App() {
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  const onInputChange = (event) => {
    setImageURL(event.target.value);
  };

  const loadUser = (user) => {
    setUser(user);
  };

  const onRouteChange = (route) => {
    if (route !== "home") {
      setImageURL("");
      setBox([]);
      setUser({});
    }
    setRoute(route);
  };

  const calculateFaceLocation = (data) => {
    if (data.outputs[0].data.regions.length === 1) {
      const clarifyFace =
        data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      const first = clarifyFace.right_col * width;
      const second = clarifyFace.bottom_row * height;
      return [
        {
          leftCol: clarifyFace.left_col * width,
          topRow: clarifyFace.top_row * height,
          rightCol: width - first,
          bottomRow: height - second,
        },
      ];
    }
    if (data.outputs[0].data.regions.length > 1) {
      const clarifyFace = data.outputs[0].data.regions.map(
        (region) => region.region_info.bounding_box
      );
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);

      const allRegions = clarifyFace.map((item) => {
        const first = item.right_col * width;
        const second = item.bottom_row * height;
        return {
          leftCol: item.left_col * width,
          topRow: item.top_row * height,
          rightCol: width - first,
          bottomRow: height - second,
        };
      });
      return allRegions;
    }
  };

  const onPictureSubmit = () => {
    if (imageURL !== "") {
      fetch("https://dry-anchorage-23432.herokuapp.com/imageurl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageURL }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch("https://dry-anchorage-23432.herokuapp.com/image", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => setUser((prev) => ({ ...prev, entries: count })))
              .catch((err) => console.log("error"));
          }
          if (response.status !== 400) {
            setBox(calculateFaceLocation(response));
          } else {
            console.log("Ops, didn't work");
          }
        });
    }
  };

  return (
    <div className="App">
      <Particle />
      <Navigation route={route} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageURL={imageURL} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
