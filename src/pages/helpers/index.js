const SIX = 6;

const verifyEmail = /\S+@\S+\.\S+/;

const { email } = JSON.parse(localStorage.getItem('user')) || {};

const ELEVEN = 11;

export { SIX, verifyEmail, email, ELEVEN };
