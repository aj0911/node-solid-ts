/**
 * Represents a Database interface with methods for managing connections.
 */
export default interface Database {
    /**
     * Establishes a connection to the database.
     * 
     * @returns {void} No return value
     */
    connect(): void;
}