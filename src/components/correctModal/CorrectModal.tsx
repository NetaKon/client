import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Lottie from "react-lottie";
import smileyAnimation from "../../assets/smiley.json";
import styles from "./CorrectModal.module.css";

export default function Correct() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: smileyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box
          className={styles.box}
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-description">
            <Lottie options={defaultOptions} height={"50vh"} width={"50vh"} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
