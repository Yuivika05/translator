<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Create User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/styles.css" rel="stylesheet">
</head>
<body>
    <jsp:include page="../common/header.jsp"/>
    
    <div class="container">
        <div class="form-container">
            <h2>Create New User</h2>
            
            <form action="${pageContext.request.contextPath}/user/create" method="post" class="needs-validation" novalidate>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                    <div class="error-message"></div>
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                    <div class="error-message"></div>
                </div>
                
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                    <div class="error-message"></div>
                </div>
                
                <button type="submit" class="btn btn-primary">Create User</button>
            </form>
        </div>
    </div>
    
    <jsp:include page="../common/footer.jsp"/>
    <script src="${pageContext.request.contextPath}/js/validation.js"></script>
</body>
</html>

