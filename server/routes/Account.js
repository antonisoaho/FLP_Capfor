const express = require('express');
const router = express.Router();
const loggedIn = require('../index');

router
  .get((req, res) => {
    !loggedIn
      ? res.redirect('/login')
      : res.render('account', {
          title: 'My Account',
          passwordChange: '',
          passwordStatus: '',
        });
  })
  .post(async (req, res) => {
    // Change password on account here
    if (!loggedIn) {
      res.redirect('/login');
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.loggedInUser.userId;

    try {
      // Validate current password
      const currentPasswordMatch = await login(
        req.session.loggedInUser.email,
        currentPassword
      );

      if (!currentPasswordMatch) {
        return res.render('account', {
          title: 'My Account',
          passwordChange: 'Old password was incorrect',
          passwordStatus: false,
        });
      }

      if (newPassword !== confirmPassword) {
        return res.render('account', {
          title: 'My Account',
          passwordChange: 'New password and confirm password do not match',
          passwordStatus: false,
        });
      }

      // Hash the new password before updating
      const hashedNewPassword = await hashPassword(newPassword);

      // Update password for the user
      await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

      // Render account view with success message
      return res.render('account', {
        title: 'My Account',
        passwordChange: 'Password changed successfully!',
        passwordStatus: true,
      });
    } catch (err) {
      console.error('Error changing password: ', err);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
