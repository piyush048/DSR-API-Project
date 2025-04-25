export const userSwaggerDocs = {
    '/users/api/v1/signup': {
      post: {
        tags: ['User'],
        summary: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['name', 'email', 'password']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'User created successfully'
          },
          400: {
            description: 'Validation error or user already exists'
          }
        }
      }
    },
  
    '/users/api/v1/login': {
      post: {
        tags: ['User'],
        summary: 'Authenticate user and return token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
  
    '/users/api/v1/profile': {
      get: {
        tags: ['User'],
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Profile fetched' },
          401: { description: 'Unauthorized' }
        }
      },
      patch: {
        tags: ['User'],
        summary: 'Update user profile',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  profilePicture: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Profile updated' },
          400: { description: 'Validation error' }
        }
      }
    },
  
    '/users/api/v1/forget-password': {
      post: {
        tags: ['User'],
        summary: 'Trigger password reset process',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' }
                },
                required: ['email']
              }
            }
          }
        },
        responses: {
          200: { description: 'OTP sent to email' },
          400: { description: 'Invalid email' }
        }
      }
    },
  
    '/users/api/v1/send-otp': {
      post: {
        tags: ['User'],
        summary: 'Resend OTP for verification',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' }
                },
                required: ['email']
              }
            }
          }
        },
        responses: {
          200: { description: 'OTP resent' }
        }
      }
    },
  
    '/users/api/v1/verify-otp': {
      post: {
        tags: ['User'],
        summary: 'Verify OTP sent to user and update password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  otp: { type: 'string' },
                  newPassword: { type: 'string' }
                },
                required: ['email', 'otp', 'newPassword']
              }
            }
          }
        },
        responses: {
          200: { description: 'Password updated successfully' },
          400: { description: 'Invalid OTP or email' }
        }
      }
    }
  };
  