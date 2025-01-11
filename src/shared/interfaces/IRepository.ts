/**
 * Generic Repository Interface
 * 
 * This interface defines a set of generic methods for CRUD operations
 * that can be implemented by any repository class to interact with a data source.
 * 
 * @template T - The type of the entity managed by the repository.
 */
export interface IRepository<T> {
    /**
     * Creates a new entity in the data source.
     * 
     * @param {T} data - The data for the entity to be created.
     * @returns {Promise<T>} - A promise that resolves to the created entity.
     */
    create(data: T): Promise<T>;
  
    /**
     * Finds an entity by its unique identifier.
     * 
     * @param {string} id - The unique identifier of the entity to find.
     * @returns {Promise<T | null>} - A promise that resolves to the entity if found, or `null` if not found.
     */
    findByID(id: string): Promise<T | null>;
  
    /**
     * Retrieves all entities from the data source.
     * 
     * @returns {Promise<T[]>} - A promise that resolves to an array of all entities.
     */
    findAll(): Promise<T[]>;
  
    /**
     * Updates an existing entity in the data source.
     * 
     * @param {string} id - The unique identifier of the entity to update.
     * @param {Partial<T>} data - Partial data to update the entity.
     * @returns {Promise<T | null>} - A promise that resolves to the updated entity if found, or `null` if not found.
     */
    update(id: string, data: Partial<T>): Promise<T | null>;
  
    /**
     * Deletes an entity from the data source by its unique identifier.
     * 
     * @param {string} id - The unique identifier of the entity to delete.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the entity was deleted, or `false` if not found.
     */
    delete(id: string): Promise<boolean>;
  }