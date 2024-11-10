package com.translator.dao;

import com.translator.model.Translation;
import com.translator.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TranslationDAO {
    
    public void addTranslation(Translation translation) throws SQLException {
        String sql = "INSERT INTO translations (source_language_id, target_language_id, " +
                    "source_text, translated_text) VALUES (?, ?, ?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            pstmt.setInt(1, translation.getSourceLanguageId());
            pstmt.setInt(2, translation.getTargetLanguageId());
            pstmt.setString(3, translation.getSourceText());
            pstmt.setString(4, translation.getTranslatedText());
            
            pstmt.executeUpdate();
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    translation.setTranslationId(generatedKeys.getInt(1));
                }
            }
        }
    }
    
    public Translation getTranslationById(int id) throws SQLException {
        String sql = "SELECT * FROM translations WHERE translation_id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToTranslation(rs);
                }
            }
        }
        return null;
    }
    
    public List<Translation> getTranslationsByLanguage(int sourceLanguageId, int targetLanguageId) 
            throws SQLException {
        List<Translation> translations = new ArrayList<>();
        String sql = "SELECT * FROM translations WHERE source_language_id = ? AND target_language_id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, sourceLanguageId);
            pstmt.setInt(2, targetLanguageId);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    translations.add(mapResultSetToTranslation(rs));
                }
            }
        }
        return translations;
    }
    
    private Translation mapResultSetToTranslation(ResultSet rs) throws SQLException {
        Translation translation = new Translation();
        translation.setTranslationId(rs.getInt("translation_id"));
        translation.setSourceLanguageId(rs.getInt("source_language_id"));
        translation.setTargetLanguageId(rs.getInt("target_language_id"));
        translation.setSourceText(rs.getString("source_text"));
        translation.setTranslatedText(rs.getString("translated_text"));
        translation.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return translation;
    }
}
