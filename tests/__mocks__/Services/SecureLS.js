class SecureLS {
  get(name) {
    if (name === 'auth') {
      return {
        access_token: 'test'
      };
    }
    return null;
  }

  set() {}
}

export default new SecureLS();
