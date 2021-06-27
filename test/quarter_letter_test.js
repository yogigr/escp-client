import Escp from "./../index.js";
import fs from "fs";

const jmljenisbarang = 28;
let escp = new Escp();

const writeHeader = (escp) => {
    escp.text('COMPANY', 15)
    escp.text(`FAKTUR PENJUALAN   HAL.${escp.currentPage}`, 25, false);
    escp.newLine();
    escp.text('Warehouse Name', 20);
    escp.text('Branch Name', 20, false)
    escp.newLine();
    escp.text('089123001230', 20);
    escp.text('089123001231', 20, false);
    escp.newLine();

    escp.text('Date:12/06/2021', 20);
    escp.text('Kode:121060005', 20, false);
    escp.newLine();

    escp.text('Jns:Order Pesanan', 20);
    escp.text('Stts:Belum Lunas', 20, false);
    escp.newLine();
    
    escp.text("-".repeat(40), 40);
    escp.newLine()
    escp.text('NO ', 3, false);
    escp.text('BRG', 14);
    escp.text('HRG', 8, false);
    escp.text('QTY', 4, false);
    escp.text('TOT', 11, false);
    escp.newLine();
    escp.text("-".repeat(40), 40);
    escp.newLine()
}

const rowItem = function(escp, index) {
    escp.text(`${index+1} `, 3, false);
    escp.text("Kent & Crew Long Sleeve Suit", 14);
    escp.text("140.000", 8, false);
    escp.text("100", 4, false);
    escp.text("14.000.000", 11, false);
    escp.newLine();
}

const writeBody = function(escp) {
    for (let index = 0; index < jmljenisbarang; index++) {
        if (escp.currentLine == 41) {
            escp.newPage()
            writeHeader(escp);
        }
        rowItem(escp, index)
    }
}

const writeFooter = (escp) => {
    escp.text("-".repeat(40), 40)
    escp.newLine();
    escp.text('TOTAL', 25);
    escp.text('900', 4, false);
    escp.text('14.000.000', 11, false);
    escp.newLine();
    escp.text("Admin:", 40, false);
    escp.newLine();
    escp.text("Branch Name", 20);
    escp.text("Admin Name", 20, false);
    escp.newLine();
    escp.newLine();
    escp.text("_".repeat("Branch Name".length), 20);
    escp.text("_".repeat("Admin Name".length), 20, false);
    escp.newLine();
}

escp.reset();
escp.setPrinterArea('\x4D', '\x30', '\x00', '\x2D', '\x2C', '\x00')
writeHeader(escp)
writeBody(escp);

if (escp.currentLine >= 37) {
    escp.newPage();
    writeHeader(escp);
}


writeFooter(escp);
escp.newPage()
escp.reset()
console.log(escp.currentLine)
escp.sendRaw()

fs.writeFile("./test/quarter_letter_result.txt", escp.raw, (err) => {
    if (err) {
        new Error(Error);
    } else {
        console.log("Success");
    }
})