// Enum for order status
enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

// Generic API Response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Product structure
interface Product {
  id: number;
  name: string;
  price: number;
}

// Order structure
interface Order {
  id: number;
  products: Product[];
  status: OrderStatus;
  totalAmount: number;
}

class OrderManager {

  private orders: Order[] = [];

  async createOrder(products: Product[]): Promise<ApiResponse<Order>> {

    // Safe reduce with explicit number type
    const total: number = products.reduce(
      (sum: number, product: Product) => sum + product.price,
      0
    );

    const newOrder: Order = {
      id: Date.now(),
      products: products,
      status: OrderStatus.Pending,
      totalAmount: total
    };

    this.orders.push(newOrder);

    await this.simulateDelay(500);

    return {
      success: true,
      data: newOrder,
      message: "Order created successfully"
    };
  }

  updateOrderStatus(
    orderId: number,
    status: OrderStatus
  ): ApiResponse<Order | null> {

    const order: Order | undefined = this.orders.find(
      (o: Order) => o.id === orderId
    );

    if (!order) {
      return {
        success: false,
        data: null,
        message: "Order not found"
      };
    }

    order.status = status;

    return {
      success: true,
      data: order,
      message: "Order status updated"
    };
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }
}

// ----------- Usage (Safer Version) -----------

async function main() {

  const manager = new OrderManager();

  const products: Product[] = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 1000 }
  ];

  const response = await manager.createOrder(products);

  console.log("Order Response:", response);

  if (response.success && response.data) {
    const updated = manager.updateOrderStatus(
      response.data.id,
      OrderStatus.Shipped
    );

    console.log("Updated Order:", updated);
  }
}

main();