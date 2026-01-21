import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function BasicModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form>
          <label>Enter Student name:</label>
          <input
            type="text"
            required
            style={{
              display: "block",
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <button type="submit">ADD</button>
        </form>
      </Box>
    </Modal>
  );
}
