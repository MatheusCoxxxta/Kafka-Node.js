import { GenerateCertificateDTO } from "../dto/GenerateCertificateDTO";
import PDFDocument from "pdfkit";
import fs from "fs";
import ICertificate from "./ICertificate";

class Certificate implements ICertificate {
  create(user: string, course: string, level: string): string {
    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    function jumpLine(doc: PDFKit.PDFDocument, lines: number) {
      for (let index = 0; index < lines; index++) {
        doc.moveDown();
      }
    }

    const fileName = `${user}-${course.replace(
      ".",
      ""
    )}-${new Date().getTime()}.pdf`;

    doc.pipe(fs.createWriteStream(`tmp/${fileName}`));

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc
      .fillAndStroke("#0e8cc3")
      .lineWidth(20)
      .lineJoin("round")
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    doc.image("assets/winners.png", doc.page.width / 2 - maxWidth / 2, 60, {
      fit: [maxWidth, maxHeight],
      align: "center",
    });

    jumpLine(doc, 5);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Development Academy", {
        align: "center",
      });

    jumpLine(doc, 2);

    // Content
    doc
      .font("fonts/NotoSansJP-Regular.otf")
      .fontSize(16)
      .fill("#021c27")
      .text("CERTIFICATE OF COMPLETION", {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Present to", {
        align: "center",
      });

    jumpLine(doc, 2);

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(24)
      .fill("#021c27")
      .text(user, {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(`Successfully completed the ${course} as ${level}.`, {
        align: "center",
      });

    jumpLine(doc, 7);

    doc.lineWidth(1);

    // Signatures
    const lineSize = 174;
    const signatureHeight = 390;

    doc.fillAndStroke("#021c27");
    doc.strokeOpacity(0.2);

    const startLine1 = 128;
    const endLine1 = 128 + lineSize;
    doc
      .moveTo(startLine1, signatureHeight)
      .lineTo(endLine1, signatureHeight)
      .stroke();

    const startLine2 = endLine1 + 32;
    const endLine2 = startLine2 + lineSize;
    doc
      .moveTo(startLine2, signatureHeight)
      .lineTo(endLine2, signatureHeight)
      .stroke();

    const startLine3 = endLine2 + 32;
    const endLine3 = startLine3 + lineSize;
    doc
      .moveTo(startLine3, signatureHeight)
      .lineTo(endLine3, signatureHeight)
      .stroke();

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("John Doe", startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Associate Professor", startLine1, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(user, startLine2, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Student", startLine2, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Jane Doe", startLine3, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Director", startLine3, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    jumpLine(doc, 4);

    // Footer
    const bottomHeight = doc.page.height - 100;

    doc.image("assets/qr.png", doc.page.width / 2 - 30, bottomHeight, {
      fit: [60, 60],
    });

    doc.end();

    return fileName;
  }
}

export { Certificate };
