export default interface ICertificate {
  create(user: string, course: string, level: string): string;
}
