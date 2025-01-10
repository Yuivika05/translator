package com.userapp.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet("/user/*")
public class UserServlet extends HttpServlet {
    private UserDAO userDAO;
    
    @Override
    public void init() {
        userDAO = new UserDAO();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getPathInfo();
        switch (action) {
            case "/register":
                showRegistrationForm(request, response);
                break;
            case "/profile":
                showProfile(request, response);
                break;
            case "/list":
                listUsers(request, response);
                break;
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getPathInfo();
        switch (action) {
            case "/register":
                registerUser(request, response);
                break;
            case "/update":
                updateProfile(request, response);
                break;
        }
    }
}
