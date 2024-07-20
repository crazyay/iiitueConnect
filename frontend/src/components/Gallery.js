import React from 'react';
import './styles.css';

function Gallery() {
  return (
    <div id="wrapper">
      <div className="container">
        <h1>GALLERY</h1>
        <div className="gallery">
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/02/WhatsApp-Image-2022-10-15-at-3.08.22-PM-768x512.jpeg" caption="figure1" />
          <GalleryItem src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQMiLMJ1ZqlFRArU4Y-spTDY0K4oEHibWr8zntuNQPQ&s" caption="figure1" />
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/11/IMG_3524-768x512.jpg" caption="figure1" />
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/02/WhatsApp-Image-2022-10-15-at-3.08.22-PM-768x512.jpeg" caption="figure1" />
          <GalleryItem src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQMiLMJ1ZqlFRArU4Y-spTDY0K4oEHibWr8zntuNQPQ&s" caption="figure1" />
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/11/IMG_3524-768x512.jpg" caption="figure1" />
        
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/02/WhatsApp-Image-2022-10-15-at-3.08.22-PM-768x512.jpeg" caption="figure1" />
          <GalleryItem src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQMiLMJ1ZqlFRArU4Y-spTDY0K4oEHibWr8zntuNQPQ&s" caption="figure1" />
          <GalleryItem src="https://iiitu.ac.in/wp-content/uploads/2022/11/IMG_3524-768x512.jpg" caption="figure1" />
        




          {/* <GalleryItem src="img/logo.png" caption="figure1" />
          <GalleryItem src="img/shoes4.avif" caption="figure1" />
          <GalleryItem src="img/backimg.jpg" caption="figure1" />
          <GalleryItem src="img/shirt.webp" caption="figure1" />
          <GalleryItem src="img/toy7.jpeg" caption="figure1" />
          <GalleryItem src="img/toys.jpg" caption="figure1" />
          <GalleryItem src="img/backimg.jpg" caption="figure1" /> */}
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ src, caption }) {
  return (
    <figure>
      <img src={src} alt="" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default Gallery;
