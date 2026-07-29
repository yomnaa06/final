import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export class EmailService {
  // envoie de password reset email lel user
  static async sendPasswordResetEmail(email: string, resetToken: string) {
    console.log('sendPasswordResetEmail called for:', email);
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe - Groupe Sghaier',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a237e;">Groupe Sghaier</h2>
          <h3>Réinitialisation de votre mot de passe</h3>
          <p>Bonjour,</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" style="background-color: #1a237e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>Ce lien expire dans <strong>1 heure</strong>.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">© 2026 Groupe Sghaier. Tous droits réservés.</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, message: 'Email envoyé avec succès.' };
    } catch (error) {
      console.error('Email error:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email.');
    }
  }

  // ===== NEW: Send contact form email =====
  static async sendContactEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const { name, email, subject, message } = data;

    // Email to you (infoseghaier@gmail.com)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'infoseghaier@gmail.com',
      subject: `[Contact Seghaier] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0D47A1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">📩 Nouveau message de contact</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #0D47A1;">👤 Nom</td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #0D47A1;">📧 Email</td>
                <td style="padding: 10px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #0D47A1;">📝 Sujet</td>
                <td style="padding: 10px 0;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #0D47A1; vertical-align: top;">💬 Message</td>
                <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            <p style="color: #666; font-size: 14px;">
              Ce message a été envoyé depuis le formulaire de contact du site Seghaier.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; color: #666; font-size: 12px;">
            <p style="margin: 0;">Seghaier Pièces Auto — infoseghaier@gmail.com</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Tous droits réservés.</p>
          </div>
        </div>
      `,
      text: `
        Nouveau message de contact
        -------------------------
        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}
        Message: ${message}
        -------------------------
        Ce message a été envoyé depuis le formulaire de contact du site Seghaier.
      `,
    };

    // Auto-reply to the user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de votre message - Seghaier Pièces Auto',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0D47A1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">✅ Message reçu</h2>
          </div>
          <div style="padding: 20px;">
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 4px; border-left: 4px solid #0D47A1; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold;">Votre message :</p>
              <p style="margin: 5px 0 0 0; font-style: italic;">"${message}"</p>
            </div>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              Cordialement,<br>
              <strong>L'équipe Seghaier Pièces Auto</strong>
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; color: #666; font-size: 12px;">
            <p style="margin: 0;">Seghaier Pièces Auto — infoseghaier@gmail.com</p>
            <p style="margin: 0;">© ${new Date().getFullYear()} Tous droits réservés.</p>
          </div>
        </div>
      `,
      text: `
        Message reçu
        ------------
        Bonjour ${name},
        Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
        Votre message: "${message}"
        Cordialement,
        L'équipe Seghaier Pièces Auto
      `,
    };

    try {
      // Send email to you
      await transporter.sendMail(mailOptions);
      console.log('Contact email sent to infoseghaier@gmail.com');

      // Send auto-reply to user
      await transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply sent to:', email);

      return { success: true, message: 'Email envoyé avec succès.' };
    } catch (error) {
      console.error('Contact email error:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email.');
    }
  }
}