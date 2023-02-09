export const themeStyles = (themeIsDark: boolean) => {
  if (themeIsDark) {
    return {
      simpleBlockWithText: {
        color: '#fff',
        backgroundColor: '#3e3737',
      },
      textColor: {
        color: '#fff',
      },
      dashboad: {
        background: 'linear-gradient(269deg, rgb(47 85 74) 0%, rgb(39 56 51) 50%, rgb(28 44 42) 100%)',
      },
      regularCard: {
        backgroundColor: '#221f1f',
        color: '#fff',
        boxShadow: '0px 0px 23px -13px rgba(204,204,204,1)',
      },
      infoCard: {
        backgroundColor: '#4a6458',
        color: '#fff',
        boxShadow: '0px 0px 23px -13px rgba(204,204,204,1)',
      },
      infoCardAccordion: {
        backgroundColor: '#ccc',
        color: '#000',
      },
    }
  }
  return null
}
