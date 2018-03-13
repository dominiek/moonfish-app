
export const getVars = () => {
  return {
    platformName: 'Moonfish',
    platformWebsiteUrl: 'https://moonfish.one/',
    tokenName: 'Moonfish PoC Token',
    contactEmailAddress: 'info@moonfish.one',
  };
};

export const fillInVars = (text) => {
  let modifiedText = text;
  const vars = getVars();
  Object.keys(vars).forEach((key) => {
    modifiedText = modifiedText.replace(new RegExp(`{\\s*${key}\\s*}`, 'g'), vars[key]);
  });
  return modifiedText;
};
