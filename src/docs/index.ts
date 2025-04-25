import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { userSwaggerDocs } from './user.swagger';
import { dsrSwaggerDocs } from './dsr.swagger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DSR Project API',
      version: '1.0.0',
      description: 'API documentation for User Onboarding and DSR features'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      ...userSwaggerDocs,
      ...dsrSwaggerDocs
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    console.log('Swagger Docs: http://localhost:' + process.env.PORT + '/api-docs')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
