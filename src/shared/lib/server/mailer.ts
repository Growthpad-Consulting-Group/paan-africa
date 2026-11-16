import nodemailer from 'nodemailer'

/** SMTP transport configured from the environment (the same settings every email route used to repeat). */
export function createMailTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export type MailTransport = ReturnType<typeof createMailTransport>
