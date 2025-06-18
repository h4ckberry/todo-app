This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Dockerコンテナのビルド・GHCRへのプッシュ・Azure Container Apps(ACA)へのデプロイ手順

### 1. コンテナイメージのビルド（linux/amd64指定）
```sh
docker buildx build --platform linux/amd64 -t ghcr.io/h4ckberry/nextjs-todo-app:latest .
```

### 2. GitHub Container Registry(GHCR)へログイン
```sh
echo "<your-personal-access-token>" | docker login ghcr.io -u h4ckberry --password-stdin
```
※Personal Access Token（PAT）はGitHubで発行し、`write:packages`スコープを付与してください。

### 3. GHCRへイメージをプッシュ
```sh
docker push ghcr.io/h4ckberry/nextjs-todo-app:latest
```

### 4. Azure Container Apps(ACA)へデプロイ
```sh
az containerapp create \
  --name ca-todo \
  --resource-group rg-todo \
  --environment cae-todo \
  --image ghcr.io/h4ckberry/nextjs-todo-app:latest \
  --target-port 3000 \
  --ingress external \
  --cpu 0.5 \
  --memory 1.0Gi \
  --registry-server ghcr.io \
  --registry-username h4ckberry \
  --registry-password <your-personal-access-token>
```

---

- `--registry-password` にはPATを入力してください。
- Apple Silicon(M1/M2)の場合は必ず`--platform linux/amd64`でビルドしてください。
- イメージ名やタグは適宜変更してください。
