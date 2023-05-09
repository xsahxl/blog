import moment from "moment";

export enum IMode {
    realTime = 'realTime',
    offline = 'offline',
}
export type IModeValue = `${IMode}`;

export interface IQucikTimes {
    key: string;
    childs?: string[];
}

export interface ITime {
    key: string;
    label: string;
    childs: ITimeChild[];
}
export interface ITimeChild {
    key: string;
    label: string;
    getValue: () => number[];
    momentValue?: moment.Moment[];
    loopTime?: number;
    getLoopValue?: () => number[];
}

export type IActive = ITimeChild;


export interface IChangeData {
    key: string;
    value: number[];
}
