declare module 'dynamic-time-warping' {
  /** A class for calculating Dynamic Time Warping (DTW). */
  class DynamicTimeWarping<T> {
    /**
     * Creates a new instance of DynamicTimeWarping.
     *
     * @param series1 The first data array.
     * @param series2 The second data array.
     * @param distanceFunction A function to compute the distance between two elements.
     */
    constructor(series1: T[], series2: T[], distanceFunction: (a: T, b: T) => number)

    /**
     * Calculates the alignment cost.
     *
     * @returns The cost of aligning the two series.
     */
    getDistance(): number

    /**
     * Retrieves the alignment path.
     *
     * @returns An array of index pairs representing the alignment path.
     */
    getPath(): [number, number][]
  }

  export = DynamicTimeWarping
}
