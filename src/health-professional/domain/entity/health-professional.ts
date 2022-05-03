export class HealthProfessional {
  public id: string;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public cellPhoneNumber: string;
  public createdAt: Date;
  public updatedAt?: Date;

  constructor(
    name: string,
    email: string,
    phoneNumber: string,
    cellPhone: string,
  ) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.cellPhoneNumber = cellPhone;
  }

  public static create(
    name: string,
    email: string,
    phoneNumber: string,
    cellPhone: string,
  ): HealthProfessional {
    return new HealthProfessional(name, email, phoneNumber, cellPhone);
  }
}
