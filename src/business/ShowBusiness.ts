import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO, WeekDay } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  async createShow(show: ShowInputDTO) {
    const timeTable = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
    let showStartTime: string
    let showEndTime: string

    if (!show.band_id || !show.end_time || !show.start_time || !show.week_day) {
      throw new Error("Informar os valores necessários: 'week_day', 'start_time', 'end_time', 'band_id'")
    }

    if (show.week_day !== WeekDay.DOMINGO && show.week_day !== WeekDay.SABADO && show.week_day !== WeekDay.SEXTA) {
      throw new Error("Informar 'week_day' como sendo 'sexta', 'sábado' ou 'domingo'")
    }

    if (show.end_time.includes(":00") && show.start_time.includes(":00")) {
      showEndTime = show.end_time.replace(":00", "")
      showStartTime = show.start_time.replace(":00", "")
    } else {
      throw new Error("Os shows só podem ser marcados em horários redondos, ou seja, 08 - 09 ou 11:00 - 14:00")
    }

    if(showEndTime.indexOf("0") === 0){
      showEndTime = showEndTime.slice(1)
    } 
    
    if (showStartTime.indexOf("0") === 0){
      showStartTime = showStartTime.slice(1)
    }

    if(!timeTable.find(e => showEndTime === e) || !timeTable.find(e => showStartTime === e)){
      throw new Error("Informe um horário válido. Horários iniciam às 08:00 e encerram às 23:00")
    }

    const showDataBase = new ShowDatabase()

    const findStartTime = await showDataBase.findShowByTime(show.week_day, Number(showStartTime), Number(showEndTime))
    const findEndTime = await showDataBase.findShowByTime(show.week_day, Number(showEndTime), Number(showStartTime))
   
    if(findStartTime && findEndTime){
      throw new Error("Já existem shows agendados nesse horário")
    }
    
    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    await showDataBase.createShow(
      id,
      show.week_day,
      Number(show.start_time),
      Number(show.end_time),
      show.band_id
    )
  }

}