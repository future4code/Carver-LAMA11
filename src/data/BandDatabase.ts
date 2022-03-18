import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";
import { BaseError } from "../error/BaseError";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bands";

  public async createBand(
    id: string,
    name: string,
    music_gender: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_gender,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      if (error instanceof BaseError)
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandById(id: string): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id });

    return result[0] && Band.toUserModel(result[0]);
  }

}
