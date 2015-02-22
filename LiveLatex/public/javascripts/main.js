$(document).ready(function() {

    var thePDF = null;
    var numPages = 0;
    var curPage = 1;

    PDFJS.getDocument('/tex-files/demo.pdf').then(function(pdf) {
        thePDF = pdf;
        numPages = thePDF.numPages;
        console.log(numPages);
        pdf.getPage(1).then(handlePages);
    });

    function handlePages(page) {

        var viewport = page.getViewport(1.5);

        var canvasWrapper = document.getElementById('canvas-wrapper');

        var canvas = document.createElement("canvas");
        canvas.style.display = "block";
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({canvasContext: context, viewport: viewport});

        canvasWrapper.appendChild(canvas);

        curPage++;
        if ( thePDF !== null && curPage <= numPages )
        {
            console.log("Fetching new page");
            thePDF.getPage( curPage ).then( handlePages );
        }
    }
});