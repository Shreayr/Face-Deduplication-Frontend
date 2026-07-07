import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import "./Results.css";

function Results() {

  const [images, setImages] = useState([]);

  useEffect(() => {

    const fetchImages = async () => {

      const token = localStorage.getItem("token");

      const response = await API.get("/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages(response.data);

    };

    fetchImages();

  }, []);

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>Uploaded Images</h1>

        <div className="gallery">

          {images.map((image) => (

            <div key={image.id} className="image-card">

              <img
                src={image.image_url}
                alt={image.filename}
              />

              <p>{image.filename}</p>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Results;