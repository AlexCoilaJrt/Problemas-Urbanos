-- 🗺️ Distritos
INSERT INTO districts (name, region) VALUES
('Centro Histórico', 'Norte'),
('La Floresta', 'Centro-Norte'),
('Cumbayá', 'Nororiente'),
('Quitumbe', 'Sur'),
('Mariscal Sucre', 'Centro-Norte');

-- 👥 Usuarios (Password: 'password123' - Hash generado con bcrypt para ejemplo)
-- Nota: En un entorno real, asegúrate de generar los hashes correctamente con tu aplicación.
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin Usuario', 'admin@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lpo/3.rJj.u4C62', 'admin'),
('Juan Pérez', 'juan@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lpo/3.rJj.u4C62', 'user'),
('Maria Lopez', 'maria@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lpo/3.rJj.u4C62', 'user');

-- 📂 Categorías
INSERT INTO categories (name, color) VALUES
('Bache', '#FF5733'),
('Alumbrado Público', '#FFC300'),
('Basura', '#DAF7A6'),
('Seguridad', '#C70039'),
('Parques y Jardines', '#900C3F');

-- 📍 Reportes
INSERT INTO reports (title, description, latitude, longitude, category_id, user_id, district_id, status) VALUES
('Bache enorme en la Av. Principal', 'Hay un bache que ocupa medio carril y es peligroso.', -0.180653, -78.467834, 1, 2, 2, 'pending'),
('Luz fundida en el parque', 'La lámpara del centro del parque no enciende.', -0.210653, -78.497834, 2, 3, 4, 'in_progress'),
('Basura acumulada en la esquina', 'El camión de basura no pasó hoy.', -0.190653, -78.487834, 3, 2, 1, 'resolved');

-- 💬 Comentarios
INSERT INTO comments (report_id, user_id, content) VALUES
(1, 3, 'Sí, yo pasé por ahí y casi rompo mi llanta.'),
(1, 1, 'Gracias por el reporte, lo revisaremos pronto.'),
(2, 2, 'Es muy oscuro en la noche, por favor arreglenlo.');

-- 👍 Votos
INSERT INTO votes (report_id, user_id) VALUES
(1, 3),
(1, 1),
(2, 2);
