'use server'

import { revalidateTag } from 'next/cache';

export async function clearReservationsCache() {
    // @ts-expect-error - TS incorrectly expects 2 arguments due to a type mismatch, but runtime only needs 1
  revalidateTag('my-reservations');
}