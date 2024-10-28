import { DataSource } from "apollo-datasource";
// import { inject, injectable } from "tsyringe";
import { injectable } from "tsyringe";
import { PrismaService } from "../../prisma/service";

@injectable()
export class UserDataSource extends DataSource {
  // constructor(@inject(PrismaService) private prismaService: PrismaService) {
  //   super();
  // }
  constructor(private prismaService: PrismaService) {
    super();
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
