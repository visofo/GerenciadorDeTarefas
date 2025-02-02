import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

// Configuração de certificados SSL para desenvolvimento
const baseFolder =
    process.env.APPDATA?.trim() ?? `${process.env.HOME}/.aspnet/https`;

const certificateName = "gerenciadordetarefas.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Função para gerar certificados
const generateCertificate = () => {
    try {
        if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
            const status = child_process.spawnSync('dotnet', [
                'dev-certs',
                'https',
                '--export-path',
                certFilePath,
                '--format',
                'Pem',
                '--no-password',
            ], { stdio: 'inherit' });

            if (status.status !== 0) {
                throw new Error("Falha ao gerar certificado SSL");
            }
        }
    } catch (error) {
        console.error('Erro ao gerar certificado:', error);
        throw error; // Re-throw the error after logging it
    }
}

try {
    if (!fs.existsSync(baseFolder)) {
        fs.mkdirSync(baseFolder, { recursive: true });
    }
    generateCertificate();
} catch (error) {
    console.error('Erro na configuração SSL:', error);
}

// Configuração do proxy
const target = process.env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
    : process.env.ASPNETCORE_URLS?.split(';')[0] || 'http://localhost:5000';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~': path.resolve(__dirname, './node_modules')
        }
    },
    server: {
        port: 5173,
        strictPort: true,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        },
        proxy: {
            '/api': {
                target,
                secure: false,
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: '../wwwroot',
        emptyOutDir: true,
        sourcemap: true
    }
});