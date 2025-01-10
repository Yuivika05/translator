package com.usermanagement.service;

import com.usermanagement.dao.UserDAO;
import com.usermanagement.model.User;
import java.util.List;

public class UserService {
    private UserDAO userDAO;
    
    public UserService() {
        this.userDAO = new UserDAO();
    }
    
    public User createUser(User user) {
        validateUser(user);
        return userDAO.insert(user);
    }
    
    public User getUserById(int id) {
        return userDAO.findById(id);
    }
    
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }
    
    private void validateUser(User user) {
        if (user.getUsername() == null || user.getUsername().length() < 3) {
            throw new IllegalArgumentException("Username must be at least 3 characters");
        }
        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
    }
}

