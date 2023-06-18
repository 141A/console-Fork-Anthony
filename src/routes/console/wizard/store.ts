import { Tier } from '$lib/system';
import { writable } from 'svelte/store';

export const createOrganization = writable<{
    id?: string;
    name: string;
    tier: Tier;
    payment: string;
}>({
    id: null,
    name: null,
    tier: Tier['PREMIUM'],
    payment: null
});
