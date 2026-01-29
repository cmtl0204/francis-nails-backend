export enum MailEnum {
  PG_DATA_SOURCE = 'PG_DATA_SOURCE',
}

export enum MailSubjectEnum {
  PASSWORD_RESET = 'Solicitud para restablecer contraseña',
  ACCOUNT_REGISTER = 'Solicitud de creación de cuenta',
  TRANSACTIONAL_CODE = 'Tu código de verificación',
}

export enum MailTemplateEnum {
  TESTING = 'features/testing/testing',
  TRANSACTIONAL_CODE = 'features/auth/transactional-code',
  TRANSACTIONAL_PASSWORD_RESET_CODE = 'features/auth/transactional-password-reset-code',
  TRANSACTIONAL_SIGNUP_CODE = 'features/auth/transactional-signup-code',
  INTERNAL_REGISTRATION_CERTIFICATE = 'internal/registration-certificate',
}
