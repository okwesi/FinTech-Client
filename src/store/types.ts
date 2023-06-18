import { PayloadAction } from '@reduxjs/toolkit';
import User from '../models/User';
import Stock from '../models/Stock';
import { Pagination } from '../network/response/StocksResponse';

export interface SliceState<T> {
	updatedAt: number;
	list: T[];
}

export interface AuthenticationState {
	isAuthenticated: boolean;
	accessToken: string;
	expiryAt: number;
}

export type StocksState = {
	list: Array<Stock>;
	pagination: Pagination;
	updatedAt: number;
};
// export type StocksState = SliceState<Stock>;

export interface ValidationState {}

export interface SelectedLocationState {
	updatedAt: number;
	locationId: number;
}

export type AuthSuccessPayload = Pick<AuthenticationState, 'accessToken' | 'expiryAt'>;

export type CPA<T = any> = PayloadAction<T> & { dispatch: Function };

export namespace Request {
	export enum Status {
		PENDING = 'pending',
		BEFORE_FULFILLED = 'before-fulfilled',
		FULFILLED = 'fulfilled',
		BEFORE_REJECTED = 'before-rejected',
		REJECTED = 'rejected',
	}

	export interface Payload {
		[key: string]: string | number | boolean | object;
	}

	export interface Info {
		name: string;
		status: Status;
		message: string;
		payload: Payload;
	}

	export interface State {
		updatedAt: number;
		list: Array<Info>;
	}
}
