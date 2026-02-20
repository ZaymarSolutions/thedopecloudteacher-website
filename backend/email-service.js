require('dotenv').config();
const nodemailer = require('nodemailer');

const smtpConfig = {
  provider: process.env.EMAIL_PROVIDER || 'smtp',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_FROM,
    pass: process.env.SMTP_PASSWORD
  }
};

const transporter = process.env.SMTP_USER
  ? nodemailer.createTransport(smtpConfig)
  : null;

const emailTemplates = {
  verifyEmail: (email, verifyUrl) => ({
    subject: 'Verify Your Email - Cloud Career Starter Kit',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4B3869; margin-bottom: 1rem;">Confirm Your Email</h1>
        <p>Hi there!</p>
        <p>Thanks for joining The Dope Cloud Teacher. Click the link below to confirm your email and access your <strong>Cloud Career Starter Kit</strong>.</p>
        <div style="text-align: center; margin: 2rem 0;">
          <a href="${verifyUrl}" style="display: inline-block; background: #4B3869; color: white; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: bold;">Verify Email</a>
        </div>
        <p style="color: #666; font-size: 0.9rem;">Or copy this link: <a href="${verifyUrl}">${verifyUrl}</a></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 2rem 0;">
        <p style="color: #666; font-size: 0.85rem;">
          This link expires in 24 hours. If you didn't sign up, please ignore this email.
        </p>
        <p style="color: #666; font-size: 0.85rem;">
          The Dope Cloud Teacher<br>
          Professional Cloud Training & Certification<br>
          <a href="https://thedopecloudteacher.com">thedopecloudteacher.com</a>
        </p>
      </div>
    `
  }),

  welcomeEmail: (email, name) => ({
    subject: 'Welcome to The Dope Cloud Teacher! 🎓',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4B3869; margin-bottom: 1rem;">Welcome${name ? `, ${name}` : ''}!</h1>
        <p>Your email is verified. You now have access to:</p>
        <ul style="line-height: 1.8;">
          <li><strong>7-Day Cloud Roadmap</strong> - Your personalized learning plan</li>
          <li><strong>Certification Checklist</strong> - AZ-900, AWS CCP, and more</li>
          <li><strong>Interview Prep Guide</strong> - 15+ behavioral + technical prompts</li>
          <li><strong>Portfolio Project Ideas</strong> - Build real cloud applications</li>
        </ul>
        <div style="text-align: center; margin: 2rem 0;">
          <a href="https://thedopecloudteacher.com/cloud-career-starter-kit.html" style="display: inline-block; background: #BFA14A; color: #1f1147; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: bold;">Access Starter Kit</a>
        </div>
        <h3 style="color: #4B3869; margin-top: 2rem;">Next Steps:</h3>
        <ol style="line-height: 1.8;">
          <li>Review your 7-day roadmap</li>
          <li>Pick a certification to target</li>
          <li>Explore our 7 complete course pathways</li>
          <li>Join the membership for ongoing support</li>
        </ol>
        <p style="color: #666; margin-top: 2rem; border-top: 1px solid #ddd; padding-top: 1rem; font-size: 0.9rem;">
          Questions? Reply to this email or visit our <a href="https://thedopecloudteacher.com/resources.html">resources page</a>.
        </p>
      </div>
    `
  })
};

const sendEmail = async (to, template, ...args) => {
  if (!transporter) {
    console.warn('Email service not configured. Set SMTP_USER and SMTP_PASSWORD.');
    return false;
  }

  try {
    const emailContent = emailTemplates[template](...args);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    });
    return true;
  } catch (error) {
    console.error(`Failed to send ${template} email:`, error);
    return false;
  }
};

module.exports = { sendEmail, transporter };
