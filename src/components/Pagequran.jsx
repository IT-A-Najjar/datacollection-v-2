import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Pagequran.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PageQuran = (page) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentIndex, setDocumentIndex] = useState(0);

  useEffect(() => {
    setPageNumber(page.page);
  }, [page]);

  const documents = [];

  for (let i = 1; i <= 604; i++) {
    documents.push(require(`../quran/${i}.pdf`));
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 2); // Go back by 2 pages
    }
  };

  const goToNextPage = () => {
    if (pageNumber <= 604) {
      setPageNumber(pageNumber + 2); // Go forward by 2 pages
    }
  };

  return (
    <div>
      <div className='ssss'>
        <Document file={documents[pageNumber]} onLoadSuccess={onDocumentLoadSuccess}>
          {/* <div className='ssss'> */}
          <div onClick={goToNextPage}>
            <Page pageNumber={1} />
          </div>
          {/* <div onClick={goToPrevPage}>
            <Page pageNumber={pageNumber + 3} />
          </div> */}
          {/* </div> */}
        </Document>
        <Document file={documents[pageNumber - 1]} onLoadSuccess={onDocumentLoadSuccess}>
          <div onClick={goToPrevPage}>
            <Page pageNumber={1} />
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PageQuran;