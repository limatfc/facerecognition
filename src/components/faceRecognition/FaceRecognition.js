import "./FaceRecognition.css";

export default function FaceRecognition({ box, imageURL }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          src={imageURL}
          alt="user inputed image"
          width="500px"
          height="auto"
          id="inputImage"
        />
        <div
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
          className="bounding-box"
        ></div>
      </div>
    </div>
  );
}
