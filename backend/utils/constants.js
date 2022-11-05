const REGEX = /https?:\/\/(www\.)?[\wА-Яа-я-]+\.[\wА-Яа-я-]{2,8}(\/?[\w\-._~:/?#[\]@!$&'()*+,;=]*)*/;
const JWT_SECRET = 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b';

module.exports = { REGEX, JWT_SECRET };
