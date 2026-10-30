// PagedPrintPreview: Paginated print preview component using pagedjs, react-to-print, and MUI Carousel
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Previewer } from "pagedjs";
import { useReactToPrint } from 'react-to-print';
import ReactDOMServer from 'react-dom/server';
import Carousel from 'react-material-ui-carousel';
import "./styles.css";

const PagedPrintPreview = forwardRef(({ content = <div></div>, header = <div></div>, footer = <div></div>, styleLocation = '', contentVisibility = false }, ref) => {
  const componentRef = useRef();
  const [isPaginated, setIsPaginated] = useState(false);
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    const previewer = new Previewer();

    const renderPreview = async () => {
      const flow = await previewer.preview(
        document.querySelector("#pagedjsdocroot").innerHTML,
        [styleLocation],
        document.querySelector("#preview")
      );

      console.log("preview rendered, total pages", flow.total, { flow });

      const pages = document.querySelectorAll('.pagedjs_page');
      document.querySelectorAll('.pagedjs_margin-top-left').forEach(page => page.remove());
      document.querySelectorAll('.pagedjs_margin-top-right').forEach(page => page.remove());
      document.querySelectorAll('.pagedjs_margin-bottom-left').forEach(page => page.remove());
      document.querySelectorAll('.pagedjs_margin-bottom-right').forEach(page => page.remove());

      let pagesArray = [];
      pages.forEach(page => {
        const pageNumber = page.getAttribute('data-page-number');

        //header component
        let stringHeader = ReactDOMServer.renderToString(header);
        stringHeader = stringHeader.replace("$page_no", pageNumber);
        stringHeader = stringHeader.replace("$total_page_no", flow.total);
        const headerCenter = page.querySelector('.pagedjs_margin-top-center');
        if (headerCenter) {
          headerCenter.innerHTML += stringHeader;
        } else {
          console.warn("header not found on page");
        }

        //footer component
        let stringFooter = ReactDOMServer.renderToString(footer);
        stringFooter = stringFooter.replace("$page_no", pageNumber);
        stringFooter = stringFooter.replace("$total_page_no", flow.total);
        const footerCenter = page.querySelector('.pagedjs_margin-bottom-center');
        if (footerCenter) {
          footerCenter.innerHTML += stringFooter;
        } else {
          console.warn("footer not found on page");
        }

        // Wrap page in a React element
        pagesArray.push(
          <div key={pageNumber} dangerouslySetInnerHTML={{ __html: page.outerHTML }} />
        );
      });

      setAllPages(pagesArray);
      setIsPaginated(true);
    };

    renderPreview();
  }, []);

  const handlePrints = useReactToPrint({
    content: () => componentRef.current,
  });

  const recallPrint = () => {
    console.log("Recalling handlePrint for non-paginated content...");
    setTimeout(() => {
      ref.current.handlePrint(); // Recall handlePrint after a delay
    }, 1000); // Adjust delay as needed
  };

  useImperativeHandle(ref, () => ({
    handlePrint: () => {
      console.log("call to print");

      if (isPaginated) {
        handlePrints();
      } else {
        console.log("Non-paginated; attempting recall...");
        recallPrint();
      }
    }
  }));

  return (
    <div>
      <div id="pagedjsdocroot" style={{ display: "none" }}>
        {content}
      </div>
      <div style={{ width: 'fit-content', height: contentVisibility ? 'unset' : '0px', overflow: contentVisibility ? 'unset' : 'hidden' }}>
        {isPaginated ?
          <Carousel autoPlay={false} className="carousel-12">
            {allPages}
          </Carousel>
          : null
        }
      </div>

      <div style={{ height: '0px', overflow: 'hidden' }}>
        <div ref={componentRef}>
          <div id="preview" />
        </div>
      </div>
    </div>
  );
});

export default PagedPrintPreview;
