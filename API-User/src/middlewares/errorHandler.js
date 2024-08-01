const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorMessages = {
    "User not found": { status: 404, message: "User not found" },
    "Incorrect password": { status: 401, message: "Incorrect password" },
    "ID is required": { status: 400, message: "ID is required" },
    "That username already exists": {
      status: 400,
      message: "That username already exists",
    },
    "Email is required": { status: 400, message: "Email is required" },
    "That email already exists": {
      status: 409,
      message: "That email already exists",
    },
    "Error logging out": { status: 500, message: "Error logging out" },
    Unauthorized: { status: 401, message: "Unauthorized" },
    "Product not found": { status: 404, message: "Product not found" },
    "Invalid credentials": { status: 401, message: "Invalid credentials" }, // Error genérico para problemas de login
  };

  const errorResponse = errorMessages[err.message] || {
    status: 500,
    message: "Internal Server Error",
  };

  res.status(errorResponse.status).json({ message: errorResponse.message });
};

export default errorHandler;
