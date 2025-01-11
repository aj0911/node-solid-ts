export default interface User{
    /**
   * The name of the user.
   * @type {string}
   */
  name: string;

  /**
   * The email address of the user.
   * @type {string}
   */
  email: string;

  /**
   * The hashed password of the user.
   * @type {string}
   */
  password: string;
}