/**
 * Gestion du State Local & Persistance LocalStorage
 */

const STORAGE_KEY = 'viteos_passeport_state_v1';

window.ViteosStore = {
  getInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Erreur lecture LocalStorage", e);
    }
    return JSON.parse(JSON.stringify(window.VITEOS_DATA.initialUser));
  },

  saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Erreur écriture LocalStorage", e);
    }
  },

  resetState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Erreur reset LocalStorage", e);
    }
    return JSON.parse(JSON.stringify(window.VITEOS_DATA.initialUser));
  }
};
