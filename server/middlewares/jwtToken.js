exports.jwtToken = async (message, statusCode, user, res) => {
  const token = await user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    token,
    message,
    user,
    isAuthenticated: true,
  });
};
