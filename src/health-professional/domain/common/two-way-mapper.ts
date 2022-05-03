export interface TwoWayMapper<T1, T2> {
  leftToRight(left: T1): T2;

  rightToLeft(right: T2): T1;
}
