This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Docker Deployment

This project supports Docker deployment for both development and production environments.

### Development Mode

To run the application in development mode using Docker:

1. Build the development Docker image:
   ```bash
   docker build -f Dockerfile.prod --target development -t alkitu-web-app:dev .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 -v $(pwd):/app alkitu-web-app:dev
   ```

   This command maps port 3000 and mounts the current directory as a volume for live code updates.

Alternatively, you can use Docker Compose for a more streamlined development experience:

1. Run the following command:
   ```bash
   docker-compose up development
   ```

   This will build the image (if needed) and start the container in development mode.

### Production Mode

To deploy the application in production mode:

1. Build the production Docker image:
   ```bash
   docker build -f Dockerfile.prod --target production -t alkitu-web-app:prod .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 -e NODE_ENV=production alkitu-web-app:prod
   ```

   This command starts the application in production mode.

Using Docker Compose for production:

1. Run the following command:
   ```bash
   docker-compose up production
   ```

   This will build the production image (if needed) and start the container in production mode.

### Additional Notes

- The development setup includes hot-reloading and other development-specific features.
- The production build is optimized for performance and security.
- Ensure all necessary environment variables are properly set, especially for production deployments.
- For production deployments, consider using a reverse proxy like Nginx and implementing proper security measures.
