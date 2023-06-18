export interface ErrorPayload {
	status: number;
	meesage: string;
}

export default interface ErrorResponse {
	data: any;
	error: ErrorPayload;
}
