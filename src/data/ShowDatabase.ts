import { BaseError } from "../error/BaseError";
import { Show, } from "../model/Show";

import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_shows"

  public async findShowByTime(week_day: string, start_time: number, end_time: number) {
    try {
      const result = await this.getConnection()
        .select("start_time", "week_day", "end_time")
        .orderBy("week_day")
        .where("week_day", `${week_day}`)
        .whereBetween("start_time", [`${start_time}`, `${end_time}`])
        .from(ShowDatabase.TABLE_NAME)
      
      return result[0]

    } catch (error) {
      const err = error as BaseError
      throw new Error(err.message || err.sqlMessage);
    }
  }

  public async findShowByEndTime() {
    try {
      const result = await this.getConnection()
        .select("start_time", "end_time", "week_day")
        .orderBy("week_day")
        // .where( )
        .from(ShowDatabase.TABLE_NAME)
      
      return result

    } catch (error) {
      const err = error as BaseError
      throw new Error(err.message || err.sqlMessage);
    }
  }

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string) {
    try {
      await this.getConnection()
        .insert({
          id, week_day, start_time, end_time, band_id
        })
        .into(ShowDatabase.TABLE_NAME)

    } catch (error) {
      const err = error as BaseError
      throw new Error(err.message || err.sqlMessage);
    }
  }
}