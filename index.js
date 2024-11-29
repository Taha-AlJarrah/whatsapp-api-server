// Developed by: Taha Al Jarrah
// Author: Taha Al Jarrah
// Date: 29/11/2024
// This script provides multiple routes: Sending messages, sending files, and checking connection status

const venom = require('venom-bot');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = 4000;

// Define a strong static API key
const API_KEY = '2c9a570f-4f19-48b3-b82c-8c6c7ed3d4a2';
console.log(`Your API Key: ${API_KEY}`);

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'WhatsApp API',
            description: 'API to send messages, files, and check WhatsApp status',
            version: '1.0.0',
        },
        servers: [{ url: `http://localhost:${port}` }],
    },
    apis: [__filename],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware to parse JSON and verify API key
app.use(express.json());
app.use((req, res, next) => {
// Bypass key verification for Swagger paths
    if (req.path.startsWith('/api-docs')) {
        return next();
    }

// Check the key for the rest of the paths
    const keyFromHeader = req.headers['x-api-key'];
    const keyFromQuery = req.query.api_key;
    if (keyFromHeader !== API_KEY && keyFromQuery !== API_KEY) {
        return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
    next();
});

// Swagger documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Function to initialize client and API routes
function initializeClient() {
    venom
        .create({
            session: 'session',
            headless: 'new',
            puppeteerOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        })
        .then((client) => {
            console.log('WhatsApp client is ready.');
            initializeRoutes(client);
        })
        .catch((error) => {
            console.error('Error initializing WhatsApp client:', error);
            setTimeout(initializeClient, 5000); // Retry after 5 seconds
        });
}

// Function to set up API routes
function initializeRoutes(client) {
    /**
     * @swagger
     * /api/message:
     *   get:
     *     summary: Send a text message
     *     parameters:
     *       - name: number
     *         in: query
     *         description: Phone number to send the message to (e.g., 1234567890)
     *         required: true
     *         schema:
     *           type: string
     *       - name: message
     *         in: query
     *         description: The message to send
     *         required: true
     *         schema:
     *           type: string
     *       - name: api_key
     *         in: query
     *         description: API key for authentication
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Message sent successfully
     *       400:
     *         description: Missing parameters
     *       500:
     *         description: Failed to send message
     */
    app.get('/api/message', async (req, res) => {
        const { number, message } = req.query;

        if (!number || !message) {
            return res.status(400).json({
                error: 'Invalid request',
                reason: 'Number and message are required',
            });
        }

        try {
            const formattedNumber = `${number}@c.us`;
            await client.sendText(formattedNumber, message);
            console.log(`Message sent to ${number}: ${message}`);
            res.json({ success: true, message: 'Message sent successfully' });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({
                error: 'Failed to send message',
                reason: error.message,
                suggestion: 'Ensure the number is valid and the client is connected',
            });
        }
    });

    /**
     * @swagger
     * /api/send-file:
     *   post:
     *     summary: Send a file or image
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               number:
     *                 type: string
     *               filePath:
     *                 type: string
     *               caption:
     *                 type: string
     *     responses:
     *       200:
     *         description: File sent successfully
     *       400:
     *         description: Missing parameters
     *       500:
     *         description: Failed to send file
     */
    app.post('/api/send-file', async (req, res) => {
        const { number, filePath, caption } = req.body;

        if (!number || !filePath) {
            return res.status(400).json({
                error: 'Invalid request',
                reason: 'Number and filePath are required',
            });
        }

        try {
            const formattedNumber = `${number}@c.us`;
            await client.sendFile(formattedNumber, filePath, '', caption || '');
            console.log(`File sent to ${number}: ${filePath}`);
            res.json({ success: true, message: 'File sent successfully' });
        } catch (error) {
            console.error('Error sending file:', error);
            res.status(500).json({
                error: 'Failed to send file',
                reason: error.message,
                suggestion: 'Ensure the file path is correct and accessible',
            });
        }
    });

    /**
     * @swagger
     * /api/status:
     *   get:
     *     summary: Check client connection status
     *     parameters:
     *       - name: api_key
     *         in: query
     *         description: API key for authentication
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Client connection status
     */
    app.get('/api/status', (req, res) => {
        const status = client.isConnected() ? 'connected' : 'disconnected';
        res.json({ status: status });
    });

    if (client && typeof client.on === 'function') {
        client.on('disconnected', (reason) => {
            console.log('Client was disconnected:', reason);
            console.log('Reinitializing client...');
            initializeClient();
        });
    }
}

// Start the server and initialize the client
app.listen(port, () => {
    console.log(`API server is running on http://localhost:${port}`);
    console.log(`API documentation is available at http://localhost:${port}/api-docs`);
    initializeClient();
});
