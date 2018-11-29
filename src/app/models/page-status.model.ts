export interface PageStatus {
  country_language: {
    formStatus: [
      {
        name: string;
        state_ok: [];
        state_missing: [];
        state_incomplete: [];
        forms: [];
      }
    ]
  }
}
