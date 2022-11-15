export interface IBaseUseCase<Params, Response> {
  execute(params: Params): Promise<Response>
}
