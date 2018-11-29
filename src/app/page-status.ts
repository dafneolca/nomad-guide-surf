export interface PageStatus {
  country_language: {
    locale: string,
    formStates: [
      {
        form: string,
        state: string,
        text: string
      }
    ],
    forms: [string]
  };
}
