'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    // files property (array) contains all of the files picked out. in this case there is one file.
    const file = event.target.files[0];

    if (!file) {
        setPickedImage(null);
      return;
    }
    // For previewing the image.
    // converts the file to data url. a value that can be used as an input for an image element.
    // used as a source for image element.
    const fileReader = new FileReader();
    // file reader reads the file
    // we get the generated url by assigning onload property in fileReader
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    // when the url is generated the onload property gets triggered
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}