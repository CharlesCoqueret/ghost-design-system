export enum WeekDayEnum {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum DateFormatEnum {
  MDY = 'MM/dd/yyyy',
  DMY = 'dd/MM/yyyy',
  YMD = 'yyyy/MM/dd',
  MMMddyyyy = 'MMM dd, yyyy',
  ddMMMyyyy = 'dd MMM yyyy',
}

export type DateFormat =
  | DateFormatEnum.MDY
  | DateFormatEnum.DMY
  | DateFormatEnum.YMD
  | DateFormatEnum.MMMddyyyy
  | DateFormatEnum.ddMMMyyyy
  | string;
