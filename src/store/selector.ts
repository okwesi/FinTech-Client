import { RootState, useTypedSelector } from '.';
import { Roles } from '../lib/utils/enum';
import User from '../models/User';
import { BondState } from './bond';
import { StockState } from './stock';
import { AuthenticationState, BondsState, RapidStocksState, Request, StocksState } from './types';
//! Selector hooks
export function useSelectState() {
	return useTypedSelector<RootState>((state) => state);
}

export function useUserState() {
	return useTypedSelector<User>(({ user }) => user);
}

export function useRequestState() {
	return useTypedSelector<Request.State>(({ request }) => request);
}

export function useAuthenticationState() {
	return useTypedSelector<AuthenticationState>(({ authentication }) => authentication);
}

export function useStocksState() {
	return useTypedSelector<StocksState>(({ stocks }) => stocks);
}

export function useStockState() {
	return useTypedSelector<StockState>(({ stock }) => stock);
}

export function useBondsState() {
	return useTypedSelector<BondsState>(({ bonds }) => bonds);
}

export function useBondState() {
	return useTypedSelector<BondState>(({ bond }) => bond);
}

export function useRapidStocksState() {
	return useTypedSelector<RapidStocksState>(({ rapidstocks }) => rapidstocks);
}

export function useAuthorizationState() {
	const { roleId: role } = useUserState();

	return {
		role,
		isAdmin: role === Roles.ADMIN,
	};
}
