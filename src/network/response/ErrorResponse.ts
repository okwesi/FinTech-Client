export interface ErrorPayload {
    status: number;
}

export default interface ErrorResponse {
    data: any;
    error: ErrorPayload;
}
