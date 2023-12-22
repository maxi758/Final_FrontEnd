import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState(); // file es el archivo que se sube
  const [previewUrl, setPreviewUrl] = useState(); // previewUrl es la url de la imagen que se ve en el preview
  const [isValid, setIsValid] = useState(false); // isValid es un booleano que indica si el archivo es válido o no

  const filePickerRef = useRef();

  useEffect(() => {
    // useEffect se ejecuta cada vez que cambia file
    if (!file) {
      return;
    }
    const fileReader = new FileReader(); // fileReader es un objeto que nos permite leer archivos
    fileReader.onload = () => {
      // onload se ejecuta cuando se termina de cargar el archivo
      setPreviewUrl(fileReader.result); // fileReader.result es la url del archivo
    };
    fileReader.readAsDataURL(file); // readAsDataURL es un método de fileReader que nos permite leer la url del archivo
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid; // isValid no se actualiza inmediatamente, por lo que se guarda en una variable auxiliar
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid); // onInput es una función que se pasa como prop desde el componente padre, en este caso NewPlace.js
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
