import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onPictureSubmit }) {
  return (
    <div className="form-wrapper">
      <p className="f3">{`This Magic Brain will detect faces in your pictures. Give it a try!`}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            onChange={onInputChange}
            className="f4 pa2 w-70 center"
            type="text"
          />
          <button
            onClick={onPictureSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-pink"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
