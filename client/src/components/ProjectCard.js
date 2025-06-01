import { Col } from "react-bootstrap";
import "./ProjectCard.css";

import React from "react";

export const ProjectCard = ({ title, description, imgUrl, url }) => {
  return (
<Col xs={12} md={6} lg={4} className="mb-4">

      <div className="project-card-wrapper">
        <div className="card h-100 shadow-sm project-card-inner">
          <img
            src={imgUrl}
            className="card-img-top img-fluid project-card-image"
            alt="project"
          />
          <div className="card-body d-flex flex-column text-start">
            <h5 className="card-title text-white">{title || "Card title"}</h5>
            <p
              className="card-text text-start"
              style={{ margin: "0", width: "100%" }}
            >
              {description ||
                "Some quick example text to build on the card title and make up the bulk of the card’s content."}
            </p>
            <a
              href={url || "#"}
                target="_blank"
              rel="noopener noreferrer"
              className="btn p-0 mt-auto"
              style={{ border: "none" }}
            >
              <button
                className="project-card-button"
                 onClick={() => window.open(url, "_blank")}
                style={{
                  background:
                    "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",
                  borderRadius: "12px",
                }}
              >
                <span style={{ color: "#fff" }}>Github Link</span>
              </button>
            </a>
          </div>

          {/* <div className="card-body d-flex flex-column justify-content-between text-start" style={{ flex: 1 }}>
  <div>
    <h5 className="card-title text-white">{title || "Card title"}</h5>
    <p className="card-text text-start" style={{ margin: "0", width: "100%" }}>
      {description || "Some quick example text to build on the card title and make up the bulk of the card’s content."}
    </p>
  </div>
  <div className="mt-auto text-end">
    <a href="#" className="btn p-0" style={{ border: "none" }}>
      <button className="project-card-button">
        <span>Github Link</span>
      </button>
    </a>
  </div>
</div> */}
        </div>
      </div>
    </Col>
  );
};
