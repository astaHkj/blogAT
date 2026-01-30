import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import config from './config'
import routes from './routes'

const app = express()

// CORS 配置 - 允许多个前端地址（开发时可能有不同端口）
app.use(cors({
    origin: function(origin, callback) {
        // 允许没有 origin 的请求（如 Postman）
        if (!origin) return callback(null, true);
        
        // 允许的域名列表
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001'
        ];
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 静态文件服务 - 上传的文件
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api', routes)

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
})

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`)
})
