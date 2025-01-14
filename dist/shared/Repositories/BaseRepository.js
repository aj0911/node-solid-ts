"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Repository Class
 *
 * This class provides a generic implementation of the `IRepository` interface
 * for performing CRUD operations on any Mongoose model. It supports basic database
 * operations such as `create`, `findByID`, `findAll`, `update`, and `delete`.
 *
 * @template T - The type of the entity managed by the repository (should extend Mongoose model).
 */
class BaseRepository {
    /**
     * Initializes the repository with the provided Mongoose model.
     *
     * @param {Model<T>} model - The Mongoose model to interact with.
     */
    constructor(model) {
        this._model = model;
    }
    /**
     * Creates a new document in the database.
     *
     * @param {T} data - The data to be inserted as a new document.
     * @returns {Promise<T>} - A promise that resolves to the created document.
     */
    async create(data) {
        return this._model.create(data);
    }
    /**
     * Finds a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document.
     * @returns {Promise<T | null>} - A promise that resolves to the found document or `null` if not found.
     */
    async findByID(id) {
        return this._model.findById(id);
    }
    /**
     * Retrieves all documents in the collection.
     *
     * @returns {Promise<T[]>} - A promise that resolves to an array of all documents.
     */
    async findAll() {
        return this._model.find();
    }
    /**
     * Updates a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document to update.
     * @param {Partial<T>} data - The data to update the document with.
     * @returns {Promise<T | null>} - A promise that resolves to the updated document or `null` if not found.
     */
    async update(id, data) {
        return this._model.findByIdAndUpdate(id, data, { new: true });
    }
    /**
     * Deletes a document by its unique identifier.
     *
     * @param {string} id - The unique identifier of the document to delete.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the document was deleted, or `false` if not found.
     */
    async delete(id) {
        const result = await this._model.findByIdAndDelete(id);
        return result ? true : false;
    }
}
exports.default = BaseRepository;
