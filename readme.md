swagger: '2.0'
info:
  title: Food Delivery App API Documentation
  description: API documentation for the Food Delivery App
  version: 1.0.0
basePath: /api
schemes:
  - http
tags:
  - name: User
    description: User related endpoints
  - name: Restaurant
    description: Restaurant related endpoints
  - name: Order
    description: Order related endpoints
paths:
  /register:
    post:
      tags:
        - User
      summary: Register a new user
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: user
          description: User object
          required: true
          schema:
            $ref: '#/definitions/User'
      responses:
        '201':
          description: User registered successfully
          schema:
            $ref: '#/definitions/User'
        '500':
          description: An error occurred
  /login:
    post:
      tags:
        - User
      summary: User login
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: credentials
          description: User login credentials
          required: true
          schema:
            $ref: '#/definitions/LoginCredentials'
      responses:
        '200':
          description: Login successful
          schema:
            $ref: '#/definitions/LoginResponse'
        '401':
          description: Invalid credentials
        '500':
          description: An error occurred
  /user/{id}/reset:
    put:
      tags:
        - User
      summary: Reset user password
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: User ID
          required: true
          type: string
        - in: body
          name: passwords
          description: Passwords object
          required: true
          schema:
            $ref: '#/definitions/ResetPasswords'
      responses:
        '204':
          description: Password reset successful
        '401':
          description: Invalid current password
        '500':
          description: An error occurred
  /restaurants:
    get:
      tags:
        - Restaurant
      summary: Get all restaurants
      produces:
        - application/json
      responses:
        '200':
          description: Successful operation
          schema:
            type: array
            items:
              $ref: '#/definitions/Restaurant'
        '500':
          description: An error occurred
  /restaurants/{id}:
    get:
      tags:
        - Restaurant
      summary: Get a restaurant by ID
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Restaurant ID
          required: true
          type: string
      responses:
        '200':
          description: Successful operation
          schema:
            $ref: '#/definitions/Restaurant'
        '404':
          description: Restaurant not found
        '500':
          description: An error occurred
  /restaurants/{id}/menu:
    get:
      tags:
        - Restaurant
      summary: Get the menu of a restaurant
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Restaurant ID
          required: true
          type: string
      responses:
        '200':
          description: Successful operation
          schema:
            type: array
            items:
              $ref: '#/definitions/MenuItem'
        '404':
          description: Restaurant not found
        '500':
          description: An error occurred
  /restaurants/{id}/menu:
    post:
      tags:
        - Restaurant
      summary: Add a new item to a restaurant's menu
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Restaurant ID
          required: true
          type: string
        - in: body
          name: item
          description: Menu item object
          required: true
          schema:
            $ref: '#/definitions/MenuItem'
      responses:
        '201':
          description: Item added successfully
          schema:
            $ref: '#/definitions/MenuItem'
        '404':
          description: Restaurant not found
        '500':
          description: An error occurred
  /restaurants/{id}/menu/{itemId}:
    delete:
      tags:
        - Restaurant
      summary: Delete a menu item from a restaurant
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Restaurant ID
          required: true
          type: string
        - in: path
          name: itemId
          description: Menu item ID
          required: true
          type: string
      responses:
        '202':
          description: Item deleted successfully
        '404':
          description: Restaurant or menu item not found
        '500':
          description: An error occurred
  /orders:
    post:
      tags:
        - Order
      summary: Place an order
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: order
          description: Order object
          required: true
          schema:
            $ref: '#/definitions/Order'
      responses:
        '201':
          description: Order placed successfully
          schema:
            $ref: '#/definitions/Order'
        '500':
          description: An error occurred
  /orders/{id}:
    get:
      tags:
        - Order
      summary: Get an order by ID
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Order ID
          required: true
          type: string
      responses:
        '200':
          description: Successful operation
          schema:
            $ref: '#/definitions/Order'
        '404':
          description: Order not found
        '500':
          description: An error occurred
    put:
      tags:
        - Order
      summary: Update the status of an order
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: Order ID
          required: true
          type: string
        - in: body
          name: status
          description: Order status object
          required: true
          schema:
            $ref: '#/definitions/OrderStatus'
      responses:
        '204':
          description: Order status updated successfully
        '404':
          description: Order not found
        '500':
          description: An error occurred
definitions:
  User:
    type: object
    properties:
      _id:
        type: string
      name:
        type: string
      email:
        type: string
      password:
        type: string
      address:
        $ref: '#/definitions/Address'
  Address:
    type: object
    properties:
      street:
        type: string
      city:
        type: string
      state:
        type: string
      country:
        type: string
      zip:
        type: string

  LoginCredentials:
    type: object
    properties:
      email:
        type: string
      password:
        type: string

  LoginResponse:
    type: object
    properties:
      token:
        type: string

  ResetPasswords:
    type: object
    properties:
      currentPassword:
        type: string
      newPassword:
        type: string

  Restaurant:
    type: object
    properties:
      _id:
        type: string
      name:
        type: string
      address:
        $ref: '#/definitions/Address'
      menu:
        type: array
        items:
          $ref: '#/definitions/MenuItem'

  MenuItem:
    type: object
    properties:
      _id:
        type: string
      name:
        type: string
      description:
        type: string
      price:
        type: number
      image:
        type: string

  Order:
    type: object
    properties:
      _id:
        type: string
      user:
        type: string
      restaurant:
        type: string
      items:
        type: array
        items:
          $ref: '#/definitions/OrderItem'
      totalPrice:
        type: number
      deliveryAddress:
        $ref: '#/definitions/Address'
      status:
        type: string

  OrderItem:
    type: object
    properties:
      name:
        type: string
      price:
        type: number
      quantity:
        type: number

  OrderStatus:
    type: object
    properties:
      status:
        type: string
