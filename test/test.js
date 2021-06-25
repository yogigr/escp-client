import Escp from "./../index.js";
import fs from "fs";

const jmljenisbarang = 10;

let escp = new Escp();

const writeHeader = function(escp) {
    escp.text("COMPANY NAME", 33);
    escp.text("DOCUMENT NAME", 30);
    escp.text(`PAGE.${escp.currentPage}`, 17, false);
    escp.newLine();
    escp.newLine();
    escp.text('FROM:', 19);
    escp.text('TO:', 26);
    escp.text('DATE:', 20, false);
    escp.text('12/06/2021', 15, false);
    escp.newLine();
    escp.text('WAREHOUSE NAME', 19);
    escp.text('BRANCH NAME', 26);
    escp.text('INV. NUMBER:', 20, false);
    escp.text('121060005', 15, false);
    escp.newLine();
    escp.text('CITY NAME', 19);
    escp.text('CITY NAME', 26);
    escp.text('ORDER TYPE:', 20, false);
    escp.text('ORDER TYPE NAME', 15, false);
    escp.newLine();
    escp.text('PHONE NUMB', 19);
    escp.text('PHONE NUMB', 26);
    escp.text('STATUS:', 20, false);
    escp.text('PAID', 15, false);
    escp.newLine();
    escp.newLine();
    escp.text('-'.repeat(80), 80);
    escp.newLine();
    escp.text(`ITEM (${jmljenisbarang})`, 35);
    escp.text("PRICE", 14, false);
    escp.text("QTY", 13, false);
    escp.text("TOTAL", 18, false);
    escp.newLine();
    escp.text("=".repeat(80), 80);
    escp.newLine();
}

const rowItem = function(escp, index) {
    escp.text(`Kent & Crew Long Sleeve Suit ${index+1}`, 35);
    escp.text("140.000", 14, false);
    escp.text("100", 13, false);
    escp.text("14.000.000", 18, false);
    escp.newLine();
}

const writeBody = function(escp) {
    for (let index = 0; index < jmljenisbarang; index++) {
        if (escp.currentLine == 41) {
            escp.newPage()
            writeHeader(escp);
            rowItem(escp, index)
        } else {
            rowItem(escp, index)
        }
    }
}

const writeFooter = function(escp) {
    escp.text("=".repeat(80), 80);
    escp.newLine();
    escp.text("TOTAL", 49);
    escp.text("2.000", 13, false);
    escp.text("280.000.000", 18, false);
    escp.newLine();
    escp.newLine();
    escp.text("ADMIN:", 80, false);
    escp.newLine();
    escp.text("BRANCH NAME", 40);
    escp.text("ADMIN NAME", 40, false);
    escp.newLine();
    escp.newLine();
    escp.text("_".repeat("BRANCH NAME".length), 40);
    escp.text("_".repeat("ADMIN NAME".length), 40, false);
    escp.newLine();
}

escp.reset();
escp.setPrinterArea();
writeHeader(escp);
writeBody(escp);
if (escp.currentLine >= 35) {
    escp.newPage();
    writeHeader(escp);
}
writeFooter(escp);
escp.newPage();
escp.reset();
escp.sendRaw();

console.log(escp);

fs.writeFile("./test/result.txt", escp.raw, (err) => {
    if (err) {
        new Error(Error);
    } else {
        console.log("Success");
    }
})