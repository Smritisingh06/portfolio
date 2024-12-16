import React, { createContext, useEffect, useState } from "react";
import _ from "lodash";

const defaultSettings = {
  direction: "ltr",
  responsiveFontSizes: true,
  theme: "DARK",
};

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem("settings");

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

export const storeSettings = (settings) => {
  window.localStorage.setItem("settings", JSON.stringify(settings));
};

const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: () => {},
});

const getTandC = () => {
  const userData = window.localStorage.getItem("tAndC");
  // console.log(" ------ userData ---- ", userData);
  if (userData) {
    return true;
  } else {
    return false;
  }
};

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings
  );

  const [acceptTandC, SetAcceptTandC] = useState(false);

  const handleSaveSettings = (update = {}) => {
    const mergedSettings = _.merge({}, currentSettings, update);

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setCurrentSettings(restoredSettings);
    }
    SetAcceptTandC(getTandC());
  }, []);

  useEffect(() => {
    document.dir = currentSettings.direction;
  }, [currentSettings]);

  const updateUserTandC = (data) => {
    window.localStorage.setItem("tAndC", true);
    SetAcceptTandC(true);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
        acceptTandC,
        updateUserTandC,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
