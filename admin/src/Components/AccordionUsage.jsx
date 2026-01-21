import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BasicModal from "./BaiscModal";
export default function AccordionUsage(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: "#a21caf",
          color: "white",
          boxShadow: "none",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IoPersonAdd />
            {props.type}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{ cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          Add 10th Student
        </AccordionDetails>
      </Accordion>

      {open && <BasicModal open={open} setOpen={setOpen} />}
    </>
  );
}
