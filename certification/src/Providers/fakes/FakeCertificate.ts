import ICertificate from "../ICertificate";

class FakeCertificate implements ICertificate {
  create(user: string, course: string, level: string): string {
    const fileName = `${user}-${course.replace(
      ".",
      ""
    )}-${new Date().getTime()}.pdf`;

    return fileName;
  }
}

export { FakeCertificate };
