export enum MailEnum {
  PG_DATA_SOURCE = 'PG_DATA_SOURCE',
}

export enum MailSubjectEnum {
  RESET_PASSWORD = 'Solicitud de Restablecimiento de Contraseña',
  ACCOUNT_REGISTER = 'Solicitud de Registro de Cuenta',
}

export enum MailTemplateEnum {
  TESTING = 'testing/testing',
  TRANSACTIONAL_CODE = 'auth/transactional-code',
  TRANSACTIONAL_PASSWORD_RESET_CODE = 'auth/transactional-password-reset-code',
  INTERNAL_REGISTRATION_CERTIFICATE = 'internal/registration-certificate',
}
