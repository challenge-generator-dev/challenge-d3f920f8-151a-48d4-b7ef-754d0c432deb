/**
 * Interfaz del repositorio de órdenes.
 * Define los métodos CRUD que deben implementarse para interactuar con DynamoDB.
 */
export interface OrderRepository {
    /**
     * Crea una nueva orden en DynamoDB.
     * @param order Orden a crear.
     * @returns La orden creada.
     */
    create(order: OrderEntity): Promise<OrderEntity>;

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden encontrada.
     * @throws OrderNotFoundException si la orden no existe.
     */
    findById(id: string): Promise<OrderEntity>;

    /**
     * Actualiza una orden existente en DynamoDB.
     * @param id ID de la orden.
     * @param order Datos actualizados de la orden.
     * @returns La orden actualizada.
     * @throws OrderNotFoundException si la orden no existe.
     */
    update(id: string, order: OrderEntity): Promise<OrderEntity>;

    /**
     * Elimina una orden de DynamoDB.
     * @param id ID de la orden.
     * @throws OrderNotFoundException si la orden no existe.
     */
    delete(id: string): Promise<void>;
}