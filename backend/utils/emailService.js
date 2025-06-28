exports.sendConfirmationEmail = (user, appointment) => {
  console.log(`Email sent to ${user.email} for appointment on ${appointment.date}`);
};