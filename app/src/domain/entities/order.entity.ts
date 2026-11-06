import { v4 as uuidv4 } from 'uuid';

/**
 * Representa una orden en el sistema.
 * Contiene los atributos esenciales de una orden y métodos para manipular su estado.
 */
export class OrderEntity {
    private readonly _id: string;
    private _customerId: string;
    private _productId: string;
    private _quantity: number;
    private _status: OrderStatus;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(customerId: string, productId: string, quantity: number) {
        if (!customerId || !productId) {
            throw new Error('Customer ID and Product ID are required');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._id = uuidv4();
        this._customerId = customerId;
        this._productId = productId;
        this._quantity = quantity;
        this._status = 'PENDING';
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    set customerId(value: string) {
        if (!value) {
            throw new Error('Customer ID is required');
        }
        this._customerId = value;
        this._updatedAt = new Date();
    }

    get productId(): string {
        return this._productId;
    }

    set productId(value: string) {
        if (!value) {
            throw new Error('Product ID is required');
        }
        this._productId = value;
        this._updatedAt = new Date();
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        if (value <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._quantity = value;
        this._updatedAt = new Date();
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(value: OrderStatus) {
        this._status = value;
        this._updatedAt = new Date();
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * Actualiza el estado de la orden basándose en la transición permitida.
     * @param newStatus Nuevo estado a asignar.
     * @throws Error si la transición no está permitida.
     */
    updateStatus(newStatus: OrderStatus): void {
        const validTransitions: Record<OrderStatus, OrderStatus[]> = {
            PENDING: ['PROCESSING', 'CANCELLED'],
            PROCESSING: ['SHIPPED', 'CANCELLED'],
            SHIPPED: ['DELIVERED'],
            DELIVERED: [],
            CANCELLED: []
        };

        if (!validTransitions[this._status].includes(newStatus)) {
            throw new Error(`Transition from ${this._status} to ${newStatus} is not allowed`);
        }
        this.status = newStatus;
    }
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';