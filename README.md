# AdegaNatAI 🍷

SaaS Full Stack para adegas e deliveries de bebidas — com painel 
administrativo, gestão de pedidos em tempo real e integração nativa 
com WhatsApp.

## 🔗 Deploy

- **Frontend:** https://adega-nat-ai.vercel.app/
- **API:** https://adeganatai.onrender.com/

## ✨ Funcionalidades

- Catálogo digital dinâmico com categorias e upload real de imagens
- Carrinho inteligente com gestão de pedidos
- Integração com WhatsApp para confirmação de pedidos
- Painel administrativo com login seguro (JWT)
- CRUD completo de produtos + controle de estoque
- Atualização de status dos pedidos em tempo real

## 🛠 Stack

**Frontend:** React · Vite · Tailwind CSS · JavaScript  
**Backend:** Node.js · Express · JWT Auth · Multer  
**Banco de dados:** PostgreSQL (Neon Database)  
**Deploy:** Vercel (frontend) + Render (API)

## 🏗 Arquitetura

/client         → React + Vite
  /components
  /pages
  /utils
/server         → Node.js + Express
  /routes       → auth, products, orders, upload
  /middleware   → autenticação JWT
  /uploads      → imagens dos produtos
  db.js         → conexão PostgreSQL (Neon)

## 🚀 Como rodar localmente

# Backend
cd server
npm install
npm start

# Frontend
cd client
npm install
npm run dev

# 🖥️ Demonstração
<img width="1883" height="912" alt="image" src="https://github.com/user-attachments/assets/2a31507c-1ce8-4f1d-80c6-665ac5a8591c" />

<img width="1829" height="853" alt="image" src="https://github.com/user-attachments/assets/25ff2406-bfbf-4277-abab-dab0f2e1185f" />






