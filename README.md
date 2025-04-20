# Food Court Management System

A web-based application to manage food court operations, including menu management, order placement, and feedback collection. The system supports multiple user roles such as students, faculty, HODs, and admins, each with specific functionalities.

## Features

### User Roles

- **Student/Faculty/HOD**:

  - Browse the menu and filter items by category.
  - Add items to the cart and place orders.
  - View active and past orders.
  - Provide feedback for completed orders.
  - View personalized profile information.

- **Admin**:
  - Manage food items (add, edit, delete, toggle availability).
  - Manage orders (mark as ready, complete, or cancel).
  - View feedback reports and statistics.
  - Update weather status to adjust pickup windows.

### Key Functionalities

- **Menu Management**: Dynamic menu with category filters and search functionality.
- **Order Management**: Place, cancel, and track orders with real-time updates.
- **Feedback System**: Collect and analyze user feedback.
- **Weather Control**: Adjust pickup windows based on weather conditions.
- **Role-Based Access**: Different features for users and admins.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Vite
- **Utilities**: `date-fns`, `lucide-react`, `qrcode.react`

## Project Structure
