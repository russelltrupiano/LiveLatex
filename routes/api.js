var express = require('express');
var router = express.Router();
var sys = require('sys')
var exec = require('child_process').exec;
var extfs = require('extfs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/render', function(req, res) {

    exec("cd ../tex-files/; pdflatex demo.tex");

    var auxEmpty = extfs.isEmptySync('../tex-files/demo.aux');

    if (auxEmpty) {
        return res.sendStatus(400);
    }
    return res.sendStatus(200);

    // var tempFile="../tex-files/demo.pdf";
    // fs.readFile(tempFile, function (err,data){

    //     if (err) {
    //         res.sendStatus(400);
    //     }

    //     res.send()

    //     response.contentType("application/pdf");
    //     response.send(data);
    // });
});

module.exports = router;
