# order-service
Node.js/Express Order API for the "Beyond Localhost" Azure demo. In-memory data.

- `GET /health`, `GET /api/orders`, `POST /api/orders` (`{"productName": "...", "quantity": 1}`)
- Run: `npm install && npm start` (port 3002), test: `npm test`
- CI: every push to `main` builds a `linux/amd64` image and pushes `<dockerhub-user>/order-service:latest` and `:<short-sha>`.
  Needs repo secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
- Deployed to Azure Container Apps by the `infra` repo.
