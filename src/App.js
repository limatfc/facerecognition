import Particle from "./components/Particle/Particle";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import { useState } from "react";
import Clarifai from "clarifai";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

function App() {
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  const onInputChange = (event) => {
    setImageURL(event.target.value);
  };

  const loadUser = (user) => {
    setUser(user);
  };

  const calculateFaceLocation = (data) => {
    const clarifyFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const first = clarifyFace.right_col * width;
    const second = clarifyFace.bottom_row * height;
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - first,
      bottomRow: height - second,
    };
  };

  const onPictureSubmit = () => {
    let app = new Clarifai.App({
      apiKey: "1f15359cc4334c08b091a3baf86a61b4",
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, imageURL)
      .then((response) => {
        if (response) {
          fetch("http://localhost:4000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser((prev) => ({ ...prev, entries: count })));
        }
        setBox(calculateFaceLocation(response)).catch((err) =>
          console.log(err)
        );
      });
  };

  return (
    <div className="App">
      <Particle />
      <Navigation route={route} onRouteChange={setRoute} />
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
        <SignIn loadUser={loadUser} onRouteChange={setRoute} />
      ) : (
        <Register onRouteChange={setRoute} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
