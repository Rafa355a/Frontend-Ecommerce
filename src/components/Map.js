// src/components/Map.js
import React from 'react';
import './Map.css';


const Map = () => {
  return (
    <div className="map-container">
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.021035714477!2d-122.40891438468104!3d37.7876022797578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d7f4c8a1f%3A0x4c5d8e2c8376b6f0!2sUnion%20Square!5e0!3m2!1sen!2sus!4v1618207773284!5m2!1sen!2sus"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
