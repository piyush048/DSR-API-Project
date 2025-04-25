export const dsrSwaggerDocs = {
    '/users/api/v1/dsr': {
      post: {
        tags: ['DSR'],
        summary: 'Add new DSR entry',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  project: { type: 'string', example: 'Task Management App' },
                  description: { type: 'string', example: 'Implemented login API' },
                  hours: { type: 'number', example: 4.5 },
                  date: { type: 'string', format: 'date', example: '2025-04-25' }
                },
                required: ['project', 'description', 'hours', 'date']
              }
            }
          }
        },
        responses: {
          201: { description: 'DSR created successfully' },
          400: { description: 'Validation error or hours exceeded' },
          401: { description: 'Unauthorized' }
        }
      },
  
      patch: {
        tags: ['DSR'],
        summary: 'Update an existing DSR',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '1' },
                  description: { type: 'string', example: 'Updated DSR details' },
                  hours: { type: 'number', example: 3 }
                },
                required: ['id']
              }
            }
          }
        },
        responses: {
          200: { description: 'DSR updated successfully' },
          400: { description: 'Validation or update error' },
          401: { description: 'Unauthorized' }
        }
      },
  
      get: {
        tags: ['DSR'],
        summary: 'Fetch DSRs with date filtering and pagination',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'startDate',
            in: 'query',
            description: 'Start date filter (YYYY-MM-DD)',
            required: false,
            schema: { type: 'string', format: 'date' }
          },
          {
            name: 'endDate',
            in: 'query',
            description: 'End date filter (YYYY-MM-DD)',
            required: false,
            schema: { type: 'string', format: 'date' }
          },
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 }
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 }
          }
        ],
        responses: {
          200: {
            description: 'List of DSRs returned'
          },
          401: { description: 'Unauthorized' }
        }
      }
    },
  
    '/users/api/v1/dsr/{dsrId}': {
      get: {
        tags: ['DSR'],
        summary: 'Get specific DSR by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'dsrId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'DSR details returned' },
          404: { description: 'DSR not found' },
          401: { description: 'Unauthorized' }
        }
      }
    }
  };
  