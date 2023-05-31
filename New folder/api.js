import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Update the base URL to match your backend API address
});

// Coach APIs

export const getCoachByUsername = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/@${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export function getAllCoaches() {
  return api.get('/coaches');
}

export function getCoachById(coachId) {
  return api.get(`/coaches/${coachId}`);
}

export function createCoach(coachData) {
  return api.post('/coaches', coachData);
}

export function updateCoach(coachId, coachData) {
  return api.put(`/coaches/${coachId}`, coachData);
}

export function getCoachIdByEmail(email) {
  return api.get(`/coaches/email/${email}`);
}
export function getCoachLevel(coachId) {
  return api.get(`/coaches/${coachId}/level`);
}
export function getCoachAverageRating(coachId) {
  return api.get(`/coaches/${coachId}/average-rating`);
}
// Game APIs
export function createGame(gameData) {
  return api.post('/games', gameData);
}

export function getAllGames() {
  return api.get('/games');
}

export const getGameByFriendlyUrl = async (friendlyUrl) => {
  try {
    const response = await axios.get(`http://localhost:3000/${friendlyUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export function getGameById(gameId) {
  return api.get(`/games/${gameId}`);
}

export function updateGame(gameId, gameData) {
  return api.put(`/games/${gameId}`, gameData);
}

export function deleteGame(gameId) {
  return api.delete(`/games/${gameId}`);
}

// Message APIs
export function sendMessage(orderId, messageData) {
  return api.post(`/messages/${orderId}`, messageData);
}

export function getMessages(orderId) {
  return api.get(`/messages/${orderId}`);
}

export function deleteMessagesByOrderId(orderId) {
  return api.delete(`/messages/${orderId}`);
}

export function deleteMessageById(messageId) {
  return api.delete(`/messages/message/${messageId}`);
}

// Order APIs
export function createOrder(orderData) {
  return api.post('/orders', orderData);
}

export function getOrders() {
  return api.get('/orders');
}

export function getOrder(orderId) {
  return api.get(`/orders/${orderId}`);
}

export function updateOrder(orderId, orderData) {
  return api.put(`/orders/${orderId}`, orderData);
}

export function deleteOrder(orderId) {
  return api.delete(`/orders/${orderId}`);
}

// Service APIs
export function createService(coachId, serviceData) {
  return api.post(`/coaches/${coachId}/services`, serviceData);
}

export function updateService(coachId, serviceId, serviceData) {
  return api.put(`/coaches/${coachId}/services/${serviceId}`, serviceData);
}

export function getService(coachId, serviceId) {
  return api.get(`/coaches/${coachId}/services/${serviceId}`);
}

export function getServicesByCoach(coachId) {
  return api.get(`/coaches/${coachId}/services`);
}

export function deleteService(coachId, serviceId) {
  return api.delete(`/coaches/${coachId}/services/${serviceId}`);
}

// User APIs
export function registerUser(userData) {
  return api.post('/users/register', userData);
}

export function loginUser(userData) {
  return api.post('/users/login', userData);
}

export function getUserProfile() {
  return api.get('/users/profile');
}

export function updateUserProfile(userData) {
  return api.put('/users/profile', userData);
}

export function deleteUser() {
  return api.delete('/users/user');
}

export function generateAffiliateLink() {
  return api.get('/users/affiliate/link');
}

export function getAffiliateDashboard() {
  return api.get('/users/affiliate/dashboard');
}

// Review APIs
export function createReview(reviewData) {
  return api.post('/reviews', reviewData);
}
export function getReviews() {
  return api.get('/reviews');
}
export function getReviewById(reviewId) {
  return api.get(`/reviews/${reviewId}`);
}
export function updateReview(reviewId, reviewData) {
  return api.put(`/reviews/${reviewId}`, reviewData);
}
export function getReviewsByCoachId(coachId) {
  return api.get(`/reviews/coach/${coachId}`);
}

//Task APIs
export function createTask(taskData) {  // New function to create a task
  return api.post('/tasks', taskData);
}
export function updateTask(taskId, taskData) {  // New function to update a task
  return api.put(`/tasks/${taskId}`, taskData);
}
export function getTasksByCustomer(customerId) {  // New function to get tasks by customer ID
  return api.get(`/tasks/customer/${customerId}`);
}
export function getTaskById(taskId) {  // New function to get a task by its ID
  return api.get(`/tasks/${taskId}`);
}
export function deleteTask(taskId) {  // New function to delete a task by its ID
  return api.delete(`/tasks/${taskId}`);
}