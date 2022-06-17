import "./FaceRecognition.css";

export default function FaceRecognition({ box, imageURL }) {
  const boxes = box.map((item) => (
    <div
      style={{
        top: item.topRow,
        right: item.rightCol,
        bottom: item.bottomRow,
        left: item.leftCol,
      }}
      className="bounding-box"
      key={item.topRow}
    ></div>
  ));

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
          id="inputImage"
        />
        {boxes}
      </div>
    </div>
  );
}
