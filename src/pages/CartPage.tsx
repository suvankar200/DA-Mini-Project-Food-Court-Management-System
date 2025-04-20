import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '../components/Cart/CartItem';
import PaymentModal from '../components/Payment/PaymentModal';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSuccess = () => {
    try {
      const orderId = placeOrder(cartItems, totalPrice);
      clearCart();
      navigate(`/orders?new=${orderId}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => setShowPayment(true)}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-md hover:from-orange-600 hover:to-orange-700 flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 flex items-center justify-center text-gray-600 hover:text-gray-800"
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="mb-4 flex justify-center">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some delicious items to your cart!</p>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Browse Menu
          </button>
        </div>
      )}

      {showPayment && (
        <PaymentModal
          amount={totalPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default CartPage;