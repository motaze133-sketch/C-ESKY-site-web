'use client';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const COOKIE_PREF_KEY = 'cesky_cookie_preferences_v1';

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
};

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(COOKIE_PREF_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as CookiePreferences;
  } catch (e) {
    console.error('Erreur de lecture des préférences de cookies', e);
    return null;
  }
}

export function saveCookiePreferences(prefs: Partial<CookiePreferences>): CookiePreferences {
  const current = getCookiePreferences() || DEFAULT_PREFERENCES;
  const updated: CookiePreferences = {
    ...current,
    ...prefs,
    necessary: true, // Always true
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(COOKIE_PREF_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('cesky_cookie_consent_changed', { detail: updated }));
    } catch (e) {
      console.error('Erreur d’enregistrement des préférences de cookies', e);
    }
  }

  return updated;
}

export function acceptAllCookies(): CookiePreferences {
  return saveCookiePreferences({
    necessary: true,
    analytics: true,
    marketing: true,
  });
}

export function rejectNonEssentialCookies(): CookiePreferences {
  return saveCookiePreferences({
    necessary: true,
    analytics: false,
    marketing: false,
  });
}
