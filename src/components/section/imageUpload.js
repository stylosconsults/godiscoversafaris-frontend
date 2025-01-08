import React, { useEffect } from "react";
import { Row, Button, Col, Image } from "react-bootstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

export default function ImageUpload({
  files,
  setFiles,
  useDropzone,
  edit,
  coverURL,
  text,
  isImageChoosed,
  isUploadingImageStarted,
  uploadImagePercent,
  handleOnUploadImage,
  multiple = false,
  context = "general", // Specify context: 'news' or 'general'
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: context === "news" || multiple,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const removeImage = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const thumbs = files.map((file, index) => (
    <div key={file.name + index} className="news-image-thumb">
      <div style={{ position: "relative" }}>
        <Image
          src={file.preview}
          style={{
            width: "100%",
            outline: "none",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Button
          variant="danger"
          size="sm"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            padding: "2px 8px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            removeImage(index);
          }}
        >
          ×
        </Button>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Row
      style={{
        marginBottom: "20px",
        marginTop: "10px",
        outline: "none",
      }}
      className={context === "news" ? "news-upload" : ""}
    >
      <Col xs={12} className={context === "news" ? "news-image-gallery" : ""}>
        {thumbs.length > 0 ? (
          <Row>{thumbs}</Row>
        ) : (
          <Image
            style={{ width: "100%", outline: "none" }}
            src={
              edit
                ? coverURL
                : "https://res.cloudinary.com/dfsai53mw1/image/upload/v1701413117/WEBS/godiscover/default_Image_rgcqj7_jdxotc.jpg"
            }
          />
        )}
      </Col>
      {!isUploadingImageStarted && (
        <Col
          xs={12}
          lg={4}
          md={12}
          sm={12}
          style={{
            display: "flex",
            outline: "none",
            flexDirection: "column",
            padding: "8px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            {...getRootProps({ className: "dropzone" })}
            style={{
              outline: "none",
              border: "1px solid #aaaaaa",
              borderRadius: "5px",
              padding: "3px",
              marginBottom: "15px",
              cursor: "pointer",
              backgroundColor: "#f3f3f3",
              width: "100%",
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            <p style={{ margin: "10px 0" }}>
              <i className="fa fa-upload"></i>
              <span>
                {text ? ` Choose ${text}` : "upload cover image"}{" "}
              </span>
              {multiple && (
                <small className="d-block">
                  {files.length > 0
                    ? `${files.length} image${
                        files.length !== 1 ? "s" : ""
                      } selected. Drop more or click to select additional images.`
                    : "(Multiple images allowed)"}
                </small>
              )}
            </p>
          </div>
          {isImageChoosed && (
            <Button
              variant="primary"
              onClick={(e) => handleOnUploadImage(e)}
              style={{ width: "100%" }}
            >
              <i className='fa fa-upload aria-hidden="true"'></i> Upload{" "}
              {files.length} {files.length === 1 ? "Image" : "Images"} to Cloud
            </Button>
          )}
        </Col>
      )}

      {isUploadingImageStarted && (
        <Row>
          <Col xs={12}>
            <Progress
              percent={uploadImagePercent}
              strokeWidth={5}
              style={{ width: "100%" }}
              status={uploadImagePercent === 100 ? "success" : ""}
              theme={{
                default: {
                  symbol: uploadImagePercent + "%",
                  trailColor: "yellow",
                  color: "orange",
                },
                active: {
                  symbol: uploadImagePercent + "%",
                  trailColor: "lightblue",
                  color: "blue",
                },
              }}
            />
            <span>
              {uploadImagePercent !== 100
                ? uploadImagePercent === 0
                  ? ""
                  : "Wait While We're uploading..."
                : text !== ""
                ? `${text} uploaded Successfully!`
                : "Images uploaded Successfully!"}
            </span>
          </Col>
        </Row>
      )}
    </Row>
  );
}
