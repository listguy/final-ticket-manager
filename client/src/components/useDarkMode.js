import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [themeLoaded, setThemeLoaded] = useState(false);

  // keeping user's preference using local storage
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const changeTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  // On mount, get theme from local storage if not undefined
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    setThemeLoaded(true);
  }, []);

  // returning the state and state handler to app
  return [theme, changeTheme, themeLoaded];
};
