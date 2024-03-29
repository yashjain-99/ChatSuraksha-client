import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import QRCode from "qrcode";

import { config } from "../constants";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useModalStateContext } from "../contexts/ModalStateProvider";
import toast from "react-hot-toast";

const Add2FaModal = () => {
  const { state, dispatch } = useModalStateContext();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [userEnteredTotp, setUserEnteredTotp] = useState(null);

  const metadata = JSON.parse(localStorage.getItem("metadata"));
  const baseUrl = `${config.url}/api/totp`;

  useEffect(() => {
    const fetchQRCode = async () => {
      if (state.is2faModalOpen) {
        setIsLoading(true);
        try {
          const registerResponse = await axiosPrivate.post(
            `${baseUrl}/register`,
            {
              userId: metadata.userId,
            }
          );
          const url = await QRCode.toDataURL(registerResponse.data.qrCodeUrl);
          setQrCodeUrl(url);
        } catch (error) {
          console.error("Error fetching QR code:", error);
        }
        setIsLoading(false);
      }
    };

    fetchQRCode();
  }, [state]);

  const [verificationProgress, setVerificationProgress] = useState(0);

  const handleVerify = async () => {
    if (!userEnteredTotp) {
      return;
    }

    try {
      const verificationResponse = await axios.post(
        `${baseUrl}/verify`,
        {
          userId: metadata.userId,
          token: userEnteredTotp,
        },
        {
          onUploadProgress: function (e) {
            setVerificationProgress((e.loaded / e.total) * 100);
          },
        }
      );
      if (verificationResponse.status !== 200) {
        throw verificationResponse.data.message;
      }
      // Handle response
      toast.success("2FA verified successfully");
      dispatch({ type: "TOGGLE_2FA_MODAL" });
    } catch (error) {
      setUserEnteredTotp(null);
      toast.error("Failed to verify TOTP");
    }
  };

  const handleUserEnteredTotp = (e) => {
    setUserEnteredTotp(e.target.value);
  };

  return (
    <Modal
      isOpen={state.is2faModalOpen}
      onRequestClose={() => dispatch({ type: "TOGGLE_2FA_MODAL" })}
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
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <>
          <h1 className="header">Add 2FA verification</h1>
          <div className="form-body" style={{ alignItems: "center" }}>
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="QR code"
                style={{
                  width: "200px",
                  height: "200px",
                  marginBottom: "20px",
                }}
              />
            )}
            <input type="text" onInput={handleUserEnteredTotp} />
            <progress
              id="progressBar"
              value={verificationProgress}
              max="100"
            ></progress>
          </div>
          <div className="form-footer">
            <button
              onClick={handleVerify}
              style={{ display: "block", marginTop: "20px" }}
            >
              Verify
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Add2FaModal;
