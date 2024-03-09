import React, { useState, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";

import { useProfilePictureModalStateContext } from "../contexts/ProfilePictureModalStateProvider";
import { config, defaultUserImage } from "../constants";

const UpdateProfilePictureModal = ({ setUserProfilePicture }) => {
  const { isModalOpen, setIsModalOpen } = useProfilePictureModalStateContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const metadata = JSON.parse(localStorage.getItem("metadata"));
  const currentProfilePicture =
    metadata.profilePicture === "" ? defaultUserImage : metadata.profilePicture;
  const API_KEY = "422492969926967";
  const CLOUD_NAME = "dvh05uunq";
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async () => {
    if (!selectedImage) {
      return;
    }
    const baseUrl = `${config.url}/api/image`;
    const signatureResponse = await axios.get(`${baseUrl}/getSignature`);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("api_key", API_KEY);
    formData.append("signature", signatureResponse.data.signature);
    formData.append("timestamp", signatureResponse.data.timestamp);

    try {
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            setUploadProgress((e.loaded / e.total) * 100);
          },
        }
      );

      const photoData = {
        userId: metadata.userId,
        public_id: cloudinaryResponse.data.public_id,
        version: cloudinaryResponse.data.version,
        signature: cloudinaryResponse.data.signature,
      };

      const afterUpdateRes = await axios.post(`${baseUrl}/update`, photoData);
      if (afterUpdateRes.status !== 200) {
        throw afterUpdateRes.data.message;
      }
      // Handle response
      console.log("Image uploaded successfully");
      setIsModalOpen(false);
      setUserProfilePicture(afterUpdateRes.data.updatedProfilePicture);
    } catch (error) {
      setIsModalOpen(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleClickChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      className="form-container"
    >
      <h1 className="header">Update Profile Picture</h1>
      <div className="form-body" style={{ alignItems: "center" }}>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              marginBottom: "20px",
            }}
          />
        ) : (
          <img
            src={currentProfilePicture}
            alt="Selected"
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              marginBottom: "20px",
            }}
          />
        )}
        <button
          className="custom-file-input-button"
          onClick={handleClickChooseFile}
        >
          Choose File
        </button>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          name="file"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <progress id="progressBar" value={uploadProgress} max="100"></progress>
      </div>
      <div className="form-footer">
        <button
          onClick={handleSave}
          style={{ display: "block", marginTop: "20px" }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
