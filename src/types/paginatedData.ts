export interface IPaginatedData<T> {
  totalNumberOfMatches: number
  currentPage: number
  limit: number
  link: string
  data: Array<T>
}