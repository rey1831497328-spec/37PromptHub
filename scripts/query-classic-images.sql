-- 查询所有经典形象提示词
SELECT p.title, p.category_id, c.name as category_name
FROM prompts p
JOIN categories c ON p.category_id = c.id
WHERE p.title LIKE '经典%形象'
ORDER BY c.name, p.sort_order;
