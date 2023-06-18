export interface ErrorPayload {
	status: number;
	message: string;
}

export default interface ErrorResponse {
	data: any;
	error: ErrorPayload;
}
