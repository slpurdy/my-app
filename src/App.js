import React, { useEffect, useState } from 'react';
import Header from './Header';
import Globe from './Globe';
import ImageViewer from './ImageViewer';
import imageDataArray from './data.json'; //:point_left:DO NOT MODIFY THIS LINE
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  // State variables &hold and update data
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState(imageDataArray);
  const [show, setShow] = useState(false);
  // Fetch image data &perform
  useEffect(() => {
    fetchImageData();
  }, []);
  // Function to fetch image data from the server while loadin
  async function fetchImageData() {
    try {
      const response = await fetch('http://localhost:3001/');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  }
  // Function to fetch random locations
  const fetchRandomLocations = () => {
    fetch('https://api.unsplash.com/photos/random/?query=landscape&count=10&client_id=0sdYTqwO6bq7uTWmSrqmLEPcuESO0WNkZ8OUGYxcNZI')
      .then(response => response.json())
      .then(data => {
        // Handle data fromm html
      })
      .catch(error => console.error('Error fetching random locations:', error));
  };
  // Event handlers from button
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageListSelect = image => {
    setSelectedImage(image);
  };
  return (
    <div className="App">
      <Header />
      <Button variant="primary" onClick={fetchImageData}>Refresh Images</Button>
      <Button variant="primary" onClick={handleShow}>Show Locations</Button>
      {/* Globe and ImageViewer components */}
      <Globe images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <ImageViewer image={selectedImage} setImage={setSelectedImage} />
      {/* Offcanvas component for displaying locations */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Locations</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {images.map((image, index) => (
              <ListGroup.Item key={index} onClick={() => handleImageListSelect(image)}>
                {image.location_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
export default App;
