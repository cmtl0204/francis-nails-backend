export enum MailEnum {
  PG_DATA_SOURCE = 'PG_DATA_SOURCE',
}

export enum MailSubjectEnum {
  PASSWORD_RESET = 'Solicitud de Restablecimiento de Contraseña',
  ACCOUNT_REGISTER = 'Solicitud de Registro de Cuenta',
  TRANSACTIONAL_CODE = 'Solicitud de Código de Verificación',
}

export enum MailTemplateEnum {
  TESTING = 'features/testing/testing',
  TRANSACTIONAL_CODE = 'features/auth/transactional-code',
  TRANSACTIONAL_PASSWORD_RESET_CODE = 'features/auth/transactional-password-reset-code',
  TRANSACTIONAL_SIGNUP_CODE = 'features/auth/transactional-signup-code',
  INTERNAL_REGISTRATION_CERTIFICATE = 'internal/registration-certificate',
}
