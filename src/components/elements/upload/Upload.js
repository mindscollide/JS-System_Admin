import React from "react";
import styles from "./upload.module.css";
// import Button from "react-bootstrap/Button";
import { Box } from "@material-ui/core";
// import { Button } from "../../../components/elements";
import { Button } from "react-bootstrap";
const CustomUpload = ({
  change,
  onClick,
  className,
  disable,
  attachmentIconClass,
}) => {
  return (
    <Box display="flex">
      {/* <Input value={file} disabled={file ? false : true} /> */}
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={change}
        disable={disable}
        onClick={onClick}
        size={1000}
        accept=".doc, .docx, .xls, .xlsx,.pdf,.png,.txt,.jpg, .jpeg,.gif"
        maxfilesize={10000000}
        disabled={disable}
      />
      <label
        htmlFor="contained-button-file"
        className={styles["ButtonForUpload"]}
      >
        <i className={`${styles["icon-upload-cloud"]} ${"icon-upload-cloud"}`}>
          Upload Counter Party Limit{" "}
        </i>
      </label>
    </Box>
  );
};

export default CustomUpload;
