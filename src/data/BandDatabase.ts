import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bands";

  public async createBand(
    id: string,
    name: string,
    gender: string,
    leader: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          gender,
          leader
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandById(id: string): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id });

    return Band.toUserModel(result[0]);
  }

}
