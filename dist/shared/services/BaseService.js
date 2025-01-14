"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Service Class
 *
 * This class provides a generic implementation for service-level operations
 * by using the `BaseRepository`. It acts as a service layer between the controller
 * and the repository, encapsulating the CRUD operations.
 *
 * @template T - The type of the entity that the service will handle.
 */
class BaseService {
    /**
     * Initializes the service with the provided repository instance.
     * The repository is used for database interaction to handle data operations.
     *
     * @param {BaseRepository<T>} baseRepository - The repository instance used for database interaction.
     */
    constructor(baseRepository) {
        this._baseRepository = baseRepository;
    }
    /**
     * Creates a new document using the repository.
     *
     * @param {T} data - The data to be inserted into the database.
     * @returns {Promise<T>} - A promise that resolves to the created document.
     */
    async create(data) {
        return this._baseRepository.create(data);
    }
    /**
     * Retrieves a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document to find.
     * @returns {Promise<T | null>} - A promise that resolves to the found document or `null` if not found.
     */
    async getById(id) {
        return this._baseRepository.findByID(id);
    }
    /**
     * Retrieves all documents from the collection.
     *
     * @returns {Promise<T[]>} - A promise that resolves to an array of all documents.
     */
    async getAll() {
        return this._baseRepository.findAll();
    }
    /**
     * Updates a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document to update.
     * @param {Partial<T>} data - The data to update the document with.
     * @returns {Promise<T | null>} - A promise that resolves to the updated document or `null` if not found.
     */
    async update(id, data) {
        return this._baseRepository.update(id, data);
    }
    /**
     * Deletes a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document to delete.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the document was deleted, or `false` if not found.
     */
    async delete(id) {
        return this._baseRepository.delete(id);
    }
}
exports.default = BaseService;
