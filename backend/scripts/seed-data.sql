USE [master]
GO

-- Create a new database
IF NOT EXISTS (SELECT *
FROM sys.databases
WHERE name = 'GerenciadorDeTarefasDB')
BEGIN
	CREATE DATABASE GerenciadorDeTarefasDB;
END;
GO