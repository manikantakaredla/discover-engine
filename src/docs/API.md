# Discover Engine API Documentation

## Base URL
`/api/v1`

## Authentication (`/auth`)
- `POST /auth/register`: Register new user (requires name, email, password)
- `POST /auth/login`: Login user (requires email, password)
- `POST /auth/logout`: Clear auth cookie
- `GET /auth/me`: Get current logged-in user profile
- `PUT /auth/profile`: Update user profile
- `DELETE /auth/profile`: Delete user account

## Users (`/users`) - Admin Only
- `GET /users`: Get all users
- `PUT /users/:id`: Update user role/status
- `DELETE /users/:id`: Delete a user

## Products (`/products`)
- `GET /products`: Get all products with pagination & filtering (`?keyword=X&category=Y&sort=price_asc`)
- `GET /products/:id`: Get single product details
- `POST /products`: Create new product (Admin Only)
- `PUT /products/:id`: Update product (Admin Only)
- `DELETE /products/:id`: Soft delete product (Admin Only)

## Session & Clickstream (`/session`)
- `POST /session/start`: Initialize a new browsing session
- `POST /session/view`: Track product view event
- `POST /session/click`: Track product click event
- `POST /session/search`: Track search event
- `POST /session/wishlist`: Track wishlist add event
- `POST /session/cart`: Track cart add event
- `POST /session/purchase`: Track purchase completion event
- `POST /session/end`: Terminate session and calculate duration

## Wishlist (`/wishlist`)
- `GET /wishlist`: Get current user's wishlist
- `POST /wishlist`: Add product to wishlist (`{ productId }`)
- `DELETE /wishlist/:productId`: Remove product from wishlist

## Cart (`/cart`)
- `GET /cart`: Get current user's cart
- `POST /cart`: Add product to cart (`{ productId, quantity }`)
- `PUT /cart`: Update cart item quantity (`{ productId, quantity }`)
- `DELETE /cart/:productId`: Remove product from cart

## Orders (`/orders`)
- `GET /orders`: Get user's order history
- `POST /orders`: Create new order from current cart (Mock Checkout)
- `GET /orders/:id`: Get order details

## Search (`/search`)
- `GET /search`: Search products (`?q=query&sessionId=optional`)
