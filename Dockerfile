# FROM node:lts as dependencies
# WORKDIR /proj
# COPY package.json ./
# RUN npm install 

# FROM node:lts as builder
# WORKDIR /proj
# COPY . .
# COPY --from=dependencies /proj/node_modules ./node_modules
# RUN npm run build

# FROM node:lts as runner
# WORKDIR /proj
# ENV NODE_ENV production
# # If you are using a custom next.config.js file, uncomment this line.
# # COPY --from=builder /proj/next.config.js ./
# COPY --from=builder /proj/public ./public
# COPY --from=builder /proj/.next ./.next
# COPY --from=builder /proj/node_modules ./node_modules
# COPY --from=builder /proj/package.json ./package.json

FROM node:lts
WORKDIR /proj
COPY . . 
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]