import { RootState, useTypedSelector } from '.';
import { Roles } from '../lib/utils/enum';
import User from '../models/User';
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

export function useBondsState() {
	return useTypedSelector<BondsState>(({ bonds }) => bonds);
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
