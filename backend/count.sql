SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'clients' as table_name, COUNT(*) as count FROM clients
UNION ALL
SELECT 'devis' as table_name, COUNT(*) as count FROM devis
UNION ALL
SELECT 'reclamations' as table_name, COUNT(*) as count FROM reclamations;