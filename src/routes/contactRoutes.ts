import { Router, Request, Response } from 'express';
import { EmailService } from '../services/emailService';

const router = Router();

router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont obligatoires.',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez entrer une adresse email valide.',
      });
    }

    // Send email
    await EmailService.sendContactEmail({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès !',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    });
  }
});

export default router;