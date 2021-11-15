import { EventEmitter } from 'eventemitter3';

export enum countDownStatus {
  START,
  RUNNING,
  STOP
}

export interface RemainIimeData {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  millseconds: number
}

export enum EventsName {
  START = 'start',
  RUNNING = 'running',
  STOP = 'stop'
}

interface EventsMap {
  [EventsName.START]: [],
  [EventsName.RUNNING]: [RemainIimeData, number],
  [EventsName.STOP]: []
}

export function fillZero(arg: number): string {
  return `0${arg}`.slice(-2)
}

export class Countdown extends EventEmitter<EventsMap> {
  private static COUNT_IN_MILLISECOND: number = 1 * 100;
  private static SECOND_IN_MILLISECOND: number = 10 * Countdown.COUNT_IN_MILLISECOND;
  private static MINUTE_IN_MILLISECOND: number = 60 * Countdown.SECOND_IN_MILLISECOND;
  private static HOUR_IN_MILLISECOND: number = 60 * Countdown.MINUTE_IN_MILLISECOND;
  private static DAY_IN_MILLISECOND: number = 24 * Countdown.HOUR_IN_MILLISECOND;

  private endTime: number;
  private status: countDownStatus = countDownStatus.STOP;
  private step: number;
  constructor(endTime: number, step = 1e3) {
    super()
    this.endTime = endTime
    this.step = step
    this.start()
  }
  start() {
    this.emit(EventsName.START)
    this.status = countDownStatus.RUNNING
    this.running()
  }
  stop() {
    this.emit(EventsName.STOP)
    this.status = countDownStatus.STOP

  }
  running(){ 
    if(this.status !== countDownStatus.RUNNING) {
      return
    }
    const remainTime = Math.max(this.endTime - Date.now(), 0)
    if(remainTime > 0) {
      setTimeout(() => {
        this.emit(EventsName.RUNNING, this.parseRemainTime(remainTime), remainTime)
        this.running()
      }, this.step)
    }else {
      this.stop()
    }
  }
  parseRemainTime(time: number): RemainIimeData {
    const days = Math.floor(time / Countdown.DAY_IN_MILLISECOND)
    time = time % Countdown.DAY_IN_MILLISECOND
    const hours = Math.floor(time / Countdown.HOUR_IN_MILLISECOND)
    time = time % Countdown.HOUR_IN_MILLISECOND
    const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLISECOND)
    time = time % Countdown.MINUTE_IN_MILLISECOND
    const seconds = Math.floor(time / Countdown.SECOND_IN_MILLISECOND)
    time = time % Countdown.SECOND_IN_MILLISECOND
    const millseconds = Math.floor(time / Countdown.COUNT_IN_MILLISECOND)
    return {
      days,
      hours,
      minutes,
      seconds,
      millseconds
    }
  }
}