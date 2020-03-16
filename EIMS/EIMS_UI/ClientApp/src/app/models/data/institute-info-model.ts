export class InstituteInfo {
  constructor(
    public instituteInfoId?: number,
    public instituteName?: string,
    public established?: Date | string,
    public instituteSlogan?: string,
    public principalName?: string,
    public founderName?: string,
    public phone?: string,
    public email?: string,
    public description?: string,
    public address?: string,
  ) { }
}
