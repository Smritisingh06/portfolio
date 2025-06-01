import React from "react";
import "./BooksCollage.css";
import book1 from "../assets/img/book1.png"; 
import book2 from "../assets/img/book2.png";
import book3 from "../assets/img/book3.png";
import book4 from "../assets/img/book4.png";
import book5 from "../assets/img/book5.png";     
import book6 from "../assets/img/book6.png";

const BooksCollage = () => {
  const books = [
    { src: book1, alt: "Book 1" },
    { src: book2, alt: "Book 2" },
    { src: book4, alt: "Book 3" },
    { src: book3, alt: "Book 4" },
    { src: book5, alt: "Book 5" },
    { src: book6, alt: "Book 6" },
  ];

  return (
    <div className="container">
      <div className="row">
        {books.map(({ src, alt }, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="image-wrapper">
              <img src={src} alt={alt} className="img-fluid book-image" />
              <div className="overlay"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksCollage;
