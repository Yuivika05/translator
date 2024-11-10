package com.translator.dao;

import com.translator.model.Language;
import com.translator.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LanguageDAO {
    
    public void addLanguage(Language language) throws SQLException {
        String sql = "INSERT INTO languages (language_code, language_name) VALUES (?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setString(1, language.getLanguageCode());
            pstmt.setString(2, language.getLanguageName());
            
            pstmt.executeUpdate();
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    language.setLanguageId(generatedKeys.getInt(1));
                }
            }
        }
    }
    
    public Language getLanguageById(int id) throws SQLException {
        String sql = "SELECT * FROM languages WHERE language_id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToLanguage(rs);
                }
            }
        }
        return null;
    }
    
    public List<Language> getAllLanguages() throws SQLException {
        List<Language> languages = new ArrayList<>();
        String sql = "SELECT * FROM languages";
        
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                languages.add(mapResultSetToLanguage(rs));
            }
        }
        return languages;
    }
    
    private Language mapResultSetToLanguage(ResultSet rs) throws SQLException {
        Language language = new Language();
        language.setLanguageId(rs.getInt("language_id"));
        language.setLanguageCode(rs.getString("language_code"));
        language.setLanguageName(rs.getString("language_name"));
        language.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return language;
    }
}
